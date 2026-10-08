import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Play, ArrowRight, ArrowLeft, Clock, Star, Terminal, RefreshCw } from 'lucide-react';

const SortableItem = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={`code-block ${isDragging ? 'is-dragging' : ''}`}
    >
      {content}
    </div>
  );
};

const BattleArena = () => {
  const navigate = useNavigate();
  const { user, questions, currentQuestionIndex, submitAnswer, nextQuestion, completedQuestions, totalHintsUsed, useHint } = useStore();
  const question = questions[currentQuestionIndex];
  
  const [availableBlocks, setAvailableBlocks] = useState([]);
  const [yourCode, setYourCode] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [resultStatus, setResultStatus] = useState(null); // 'correct', 'wrong', null
  const [hintsUsed, setHintsUsed] = useState(0);
  const [paidHintsUsed, setPaidHintsUsed] = useState(0);
  const timerRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (question) {
      // Scramble blocks initially
      const scrambled = [...question.blocks].sort(() => 0.5 - Math.random());
      setAvailableBlocks(scrambled);
      setYourCode([]);
      setTimeLeft(question.timeLimit || 120);
      setOutput('');
      setResultStatus(null);
      setHintsUsed(0);
      setPaidHintsUsed(0);
      
      const status = completedQuestions[question.id];
      if (status) {
        setResultStatus(status.isCorrect ? 'correct' : 'wrong');
        // If already completed, just show a message, no need for timer
      } else {
        startTimer();
      }
    }
    return () => clearInterval(timerRef.current);
  }, [question, currentQuestionIndex]);

  const handleGetHint = () => {
    if (question.hints && hintsUsed < question.hints.length) {
      if (totalHintsUsed >= 10) {
        setPaidHintsUsed(p => p + 1);
      }
      useHint();
      setHintsUsed(h => h + 1);
    }
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeUp = () => {
    setResultStatus('wrong');
    setOutput('Time UP! Question submitted with no speed bonus.');
    submitAnswer(question.id, false, question.timeLimit, hintsUsed, paidHintsUsed);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Check where they belong
    const activeInAvailable = availableBlocks.find(b => b.id === activeId);
    const activeInYourCode = yourCode.find(b => b.id === activeId);
    const overInAvailable = availableBlocks.find(b => b.id === overId);
    const overInYourCode = yourCode.find(b => b.id === overId);

    // Reordering within Your Code
    if (activeInYourCode && overInYourCode) {
      setYourCode(items => {
        const oldIndex = items.findIndex(item => item.id === activeId);
        const newIndex = items.findIndex(item => item.id === overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    // Reordering within Available Blocks
    else if (activeInAvailable && overInAvailable) {
      setAvailableBlocks(items => {
        const oldIndex = items.findIndex(item => item.id === activeId);
        const newIndex = items.findIndex(item => item.id === overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    // Move from Available to Your Code
    else if (activeInAvailable && overInYourCode) {
      setAvailableBlocks(items => items.filter(i => i.id !== activeId));
      setYourCode(items => {
        const newIndex = items.findIndex(item => item.id === overId);
        const newItems = [...items];
        newItems.splice(newIndex, 0, activeInAvailable);
        return newItems;
      });
    }
    // Move from Your Code to Available
    else if (activeInYourCode && overInAvailable) {
      setYourCode(items => items.filter(i => i.id !== activeId));
      setAvailableBlocks(items => {
        const newIndex = items.findIndex(item => item.id === overId);
        const newItems = [...items];
        newItems.splice(newIndex, 0, activeInYourCode);
        return newItems;
      });
    }
    // Drop in empty area - handled by special drop zones below
  };

  const moveToYourCode = (block) => {
    setAvailableBlocks(items => items.filter(i => i.id !== block.id));
    setYourCode(items => [...items, block]);
  };

  const moveToAvailable = (block) => {
    setYourCode(items => items.filter(i => i.id !== block.id));
    setAvailableBlocks(items => [...items, block]);
  };

  const runCode = async () => {
    if (yourCode.length === 0) return;
    setIsRunning(true);
    setOutput('Executing code...');
    
    // Construct Python code
    const codeString = yourCode.map(b => b.content).join('\n');
    
    // MOCK EXECUTION FOR DEMO
    // In a real app, this would use Pyodide
    setTimeout(() => {
      // Mock logic based on block sequence comparison or simple eval
      let isCorrect = false;
      let mockOutput = '';
      
      // Basic mock check: did they put them in exactly the right order based on original question blocks?
      const originalOrderIds = question.blocks.map(b => b.id).join(',');
      const theirOrderIds = yourCode.map(b => b.id).join(',');
      
      if (yourCode.length === question.blocks.length && originalOrderIds === theirOrderIds) {
        isCorrect = true;
        mockOutput = question.expectedOutput;
      } else {
        isCorrect = false;
        mockOutput = "Error: Logic incorrect or unexpected output format.\n\nInput provided: " + question.expectedInput;
      }

      setOutput(mockOutput);
      setIsRunning(false);
      
      if (isCorrect) {
        clearInterval(timerRef.current);
        setResultStatus('correct');
        submitAnswer(question.id, true, question.timeLimit - timeLeft, hintsUsed, paidHintsUsed);
      } else {
        setResultStatus('wrong');
        // Assuming we penalize but let them try again? The spec says -10 but maybe retry.
        // For now, let's just mark it wrong if they fail.
        if (completedQuestions[question.id] === undefined) {
           submitAnswer(question.id, false, question.timeLimit - timeLeft, hintsUsed, paidHintsUsed);
        }
      }
    }, 1000);
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', paddingBottom: '2rem' }}>
      {/* Top Bar */}
      <div className="flex-col-mobile gap-sm-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '0 1.5rem' }}>
        <div className="text-center-mobile">
          <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>CODEBLOCKS BATTLE</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Team: {user.teamName} | {user.members ? `${user.members.length} Members` : ''}
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Question {String(currentQuestionIndex + 1).padStart(2, '0')} / {questions.length}</div>
          <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {question.title} 
            <span style={{ 
              fontSize: '0.7rem', 
              padding: '0.1rem 0.4rem', 
              borderRadius: 'var(--radius-sm)', 
              background: question.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.2)' : question.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: question.difficulty === 'Easy' ? 'var(--success)' : question.difficulty === 'Medium' ? '#f59e0b' : 'var(--danger)',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>{question.difficulty}</span>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', 
          color: timeLeft < 30 ? 'var(--danger)' : 'var(--accent)'
        }}>
          <Clock size={24} /> {formatTime(timeLeft)}
        </div>
      </div>

      <div style={{ height: '2px', background: 'var(--border-subtle)', marginBottom: '1.5rem' }}>
        <div style={{ height: '100%', width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`, background: 'var(--primary)', transition: 'width 0.3s' }}></div>
      </div>

      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Question Text */}
        <div className="glass-panel p-1-mobile" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
          <div className="flex-col-mobile gap-sm-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem' }}>Question</h3>
              <p style={{ fontSize: '1.1rem' }}>{question.description}</p>
            </div>
            {question.hints && hintsUsed < question.hints.length && !completedQuestions[question.id] && (
              <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={handleGetHint}>
                Use Hint {hintsUsed + 1} ({totalHintsUsed < 10 ? `Free (${10 - totalHintsUsed} left)` : '-1 Star'})
              </button>
            )}
          </div>
          
          {hintsUsed > 0 && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-inset-light)', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Hints Used</h4>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {question.hints && question.hints.slice(0, hintsUsed).map((hint, i) => (
                   <li key={i} style={{ marginBottom: '0.25rem' }}>{hint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="arena-blocks-container gap-sm-mobile" style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>
            
            {/* Available Blocks */}
            <div className="glass-panel w-full-mobile p-1-mobile" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem', minHeight: '300px' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                AVAILABLE CODE BLOCKS
                <RefreshCw size={16} style={{ cursor: 'pointer' }} onClick={() => {
                  setAvailableBlocks(question.blocks.sort(() => 0.5 - Math.random()));
                  setYourCode([]);
                }} />
              </h4>
              <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem', background: 'var(--bg-inset)', borderRadius: 'var(--radius-sm)' }}>
                <SortableContext items={availableBlocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  {availableBlocks.map((block) => (
                    <div key={block.id} onClick={() => moveToYourCode(block)}>
                      <SortableItem id={block.id} content={block.content} />
                    </div>
                  ))}
                  {availableBlocks.length === 0 && (
                    <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem', fontStyle: 'italic' }}>
                      All blocks moved.
                    </div>
                  )}
                </SortableContext>
              </div>
            </div>

            {/* Middle: Drag indicator */}
            <div className="arena-drag-indicator" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <ArrowRight size={24} />
            </div>

            {/* Your Code */}
            <div className="glass-panel w-full-mobile p-1-mobile" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem', borderColor: 'var(--primary)', minHeight: '300px' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>YOUR CODE</h4>
              <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem', background: 'var(--bg-inset)', borderRadius: 'var(--radius-sm)' }}>
                <SortableContext items={yourCode.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  {yourCode.map((block, index) => (
                    <div key={block.id} onClick={() => moveToAvailable(block)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', width: '20px', paddingTop: '1rem' }}>{index + 1}.</span>
                      <div style={{ flex: 1 }}>
                        <SortableItem id={block.id} content={block.content} />
                      </div>
                    </div>
                  ))}
                  {yourCode.length === 0 && (
                    <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem', fontStyle: 'italic' }}>
                      Drag blocks here or click them.
                    </div>
                  )}
                </SortableContext>
              </div>
            </div>
          </div>
        </DndContext>

        {/* Bottom Panel: Actions & Output */}
        <div className="arena-panels-bottom gap-sm-mobile" style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', height: '200px' }}>
          
          {/* Output Terminal */}
          <div className="glass-panel w-full-mobile p-1-mobile" style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', padding: '1rem', background: 'var(--terminal-bg)' }}>
            <h4 style={{ color: 'var(--terminal-header)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Terminal size={16} /> OUTPUT
            </h4>
            <div style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--terminal-text)', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
              {output || <span style={{ color: 'var(--text-muted)' }}>Run code to see output...</span>}
            </div>
          </div>

          {/* Actions & Result */}
          <div className="glass-panel w-full-mobile p-1-mobile" style={{ flex: '1 1 30%', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            {resultStatus === 'correct' ? (
              <div className="animate-star" style={{ textAlign: 'center', color: 'var(--success)' }}>
                <Star size={48} fill="var(--success)" style={{ margin: '0 auto' }} />
                <h3 style={{ marginTop: '0.5rem' }}>CORRECT!</h3>
                <div style={{ color: '#f59e0b', fontWeight: 'bold' }}>+{question.points} POINTS</div>
                <div style={{ color: '#f59e0b' }}>+{Math.max(0, 1 - paidHintsUsed)} STAR</div>
                <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => {
                  nextQuestion();
                  navigate('/dashboard');
                }}>NEXT QUESTION <ArrowRight size={16} /></button>
              </div>
            ) : resultStatus === 'wrong' ? (
              <div style={{ textAlign: 'center', color: 'var(--danger)' }}>
                <h3>❌ INCORRECT</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>The output does not match expected.</p>
                <button className="btn btn-secondary" onClick={() => setResultStatus(null)}>Try Again</button>
                <button className="btn btn-secondary" style={{ marginTop: '0.5rem' }} onClick={() => {
                  nextQuestion();
                  navigate('/dashboard');
                }}>Skip Question</button>
              </div>
            ) : (
              <>
                <button 
                  className="btn btn-accent" 
                  style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}
                  onClick={runCode}
                  disabled={isRunning || yourCode.length === 0}
                >
                  <Play fill="currentColor" /> {isRunning ? 'RUNNING...' : 'RUN CODE'}
                </button>
                <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => navigate('/dashboard')}>
                  <ArrowLeft size={16} /> BACK TO DASHBOARD
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BattleArena;
