import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAccessibility } from './AccessibilityContext';
import '../assets/styles/Dictionary.css'; // Add your CSS styles here
import { IoClose } from 'react-icons/io5';

const fetchDefinition = async (word) => {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    console.log('API response:', response.data); // Debugging

    // Extract the first entry
    const entry = response.data[0];

    // Get the word and part of speech
    const wordText = entry.word;
    const meanings = entry.meanings.map(meaning => {
      const partOfSpeech = meaning.partOfSpeech;
      const definitions = meaning.definitions.map(def => def.definition).join(', ');
      return `<strong>${wordText} (${partOfSpeech}):</strong> ${definitions}`;
    }).join('<br>');

    return meanings;
  } catch (error) {
    console.error('Error fetching definition:', error);
    return 'Definition not found.';
  }
};

const Dictionary = () => {
  const { selectedWord, isDictionaryMode } = useAccessibility();
  const [definition, setDefinition] = useState('');
  const [definitionAvailable, setDefinitionAvailable] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPronouncing, setIsPronouncing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(() => {
    if (!isDictionaryMode) {
      // Reset selected word and definition when dictionary mode is disabled
      setSelectedWord(null); // Assuming you have a function to set the selected word
      setDefinition('');
      setDefinitionAvailable(false);
      return;
    }

    if (selectedWord) {
      setIsPopupVisible(true);
      //cancel any ongoing speech synthesis when a new word is selected
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPronouncing(false);
      }

      console.log('Fetching definition for:', selectedWord); // Debugging
      const getDefinition = async () => {
        setLoading(true);
        const def = await fetchDefinition(selectedWord);
        setLoading(false);
        setDefinition(def);

        if (def && def !== 'Definition not found.') {
          setDefinitionAvailable(true);
        } else {
          setDefinitionAvailable(false);
        }
      };
      getDefinition();
    }
  }, [selectedWord, isDictionaryMode]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPronouncing(false);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('SpeechSynthesis not supported in this browser.');
    }
  };

  const readDefinition = () => {
    if (definitionAvailable) {
      if (isSpeaking || isPronouncing) {
        window.speechSynthesis.cancel(); // Stop ongoing speech
        setIsSpeaking(false);
        setIsPronouncing(false);
      } else {
        speak(definition.replace(/<[^>]+>/g, '')); // Remove HTML tags
      }
    }
  };

  const pronounceWord = () => {
    if (definitionAvailable) {
      if (isSpeaking || isPronouncing) {
        window.speechSynthesis.cancel(); // Stop ongoing speech
        setIsSpeaking(false);
        setIsPronouncing(false);
      } else {
        speak(selectedWord);
        setIsPronouncing(true);
      }
    }
  };

  if (!isDictionaryMode) {
    // console.log('Dictionary mode is not active'); 
    return null;
  }

  const handleClose = () => {
    setIsPopupVisible(false); // Hide the dictionary popup
  };


  return (
    isPopupVisible && (
      <div className="dictionary-popup">
        <button className="dictionary-close-button" onClick={handleClose}><IoClose /></button>
        {loading ? (
          <div className="dictionary-loading">
            <div className="spinner"></div>
            <div className="button-text mt-4"> Searching..</div>
          </div>
        ) : (
          <>
            {!selectedWord ? (
              <div className="dictionary-message">Please select a word to see its definition.</div>
            ) : (
              <>
                <div className="dictionary-definition">
                  <div dangerouslySetInnerHTML={{ __html: definition }} />
                </div>

                {definitionAvailable && (
                  <>
                    <button className={`dictionary-button ${isSpeaking && !isPronouncing ? 'active' : ''}`}
                      onClick={readDefinition}
                    >
                      {isSpeaking && !isPronouncing ?
                        <div className="button-text">Stop</div>
                        :
                        <div className="button-text">Read</div>
                      }
                    </button>

                    <button className={`dictionary-button ${isPronouncing ? 'active' : ''}`}
                      onClick={pronounceWord}
                    >
                      <div className="button-text">Pronounce</div>
                    </button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>

    )
  );
};

export default Dictionary;

