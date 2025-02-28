// Main file for the experiment 
// Following the timeline structure approach used by Bran 
// Outline:
// 1. Initialize the jsPsych scripts
// 2. Use conts to define each section of the experiment
    // a. Consent form
    // b. Instructions  
    // c. Practice trial 
    // d. Main trials
    // e. Debrief & thank you
// 3. Push to prolifirate
// ==============================
// Anagrammer statistics task LFolsom 24
// ==============================
/// -----Time conversion cheat sheet ------///
// 30 seconds = 30000 ms
// 1 minute = 60000 ms
// 5 minutes = 300000 ms    
// 10 minutes = 600000 ms
/// -----------------------------------------///

// ---------------- 1. Initialize the jsPsych scripts ------------------- //
const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: true,
    on_finish: function(data) {
        console.log(data);
      // Add interactions to the data variable
      var interaction_data = jsPsych.data.getInteractionData();
      jsPsych.data.get().addToLast({interactions: interaction_data.json()});
      // Submit to proliferate (uncomment to use)
      proliferate.submit({data: jsPsych.data.get().values()});
      // View the data as a json object
      //jsPsych.data.displayData('json')
    }
});
let timeline = [];

// ------------------- 2. Consent ------------------- //
// Get the subject ID
const subject_id = jsPsych.data.getURLVariable('subject_id') || '999';
// Add the subject ID to the data
jsPsych.data.addProperties({subject: subject_id});

// Consent instructions
const consent_instructions = {
    type: jsPsychInstructions, //name type of plugin
    pages: [
          "<p>Thank you for participating in our experiment,</p><p> please use the left and right arrow keys to progress through the following consent form.</p>",
          "<p><b>STUDY TITLE:</b></p><p>Behavioral studies of decision making and executive function.</b></p><p>FOR QUESTIONS ABOUT THE STUDY, CONTACT: Dr. Russell Poldrack at [650-497-8488]</p><p><b>DESCRIPTION:</b></p><p>You are invited to participate in a research study that aims to understand human decision making, executive control (the management and coordination of cognitive processes), learning, and memory.  </p><p> We hope to learn more about the brain and cognitive mechanisms that support these cognitive abilities. As a young, healthy volunteer, you have been asked to participate in this study because our objective is to understand the cognitive functions supported by the healthy human brain. You will be asked to verify that you are between 18-50 years of age. You will be asked to attend to stimuli presented from a computer (usually visual or auditory) and then make a response (usually with hands or with saccadic eye movements) based upon the stimuli.</p>",
          "<p><i>You will be asked to make responses in one or more of the following conditions:</i></p><p> 1. Respond based upon your preferences between different presented options.</p><p> 2. Respond as quickly and accurately as possible to stimuli that are presented in succession.</p><p> 3. Learn a set of stimuli and later respond based upon your memory of the stimuli that you learned.</p><p> As your participation in the experiment is voluntary, you are free to discontinue the experiment at any point. At the discretion of the protocol director subjects may be taken out of this study due to unanticipated circumstances.</p><p><i> Some possible reasons for withdrawal are:</i></p><p> - Failure to follow instructions</p><p>- The investigator decides that continuation would be harmful to you </p><p>-The study is cancelled</p><p>-Not meeting inclusion criteria</p>",
          "<p><b>TIME INVOLVEMENT:</b></p><p> Your participation in this experiment will take approximately 30-60 minutes. Longer studies will be broken up across multiple study sessions. The specific length of the study that you will be completing will be in your study description.</p><p><b> RISKS AND BENEFITS:</b></p><p>There are no known risks associated with participation in this study. We cannot and do not guarantee or promise that you will receive any benefits from this study.</p><p><b>PAYMENTS:</b></p><p> As compensation for your participation, you will be paid at the rate listed on Prolific at the end of the testing session.</p><p> There is no cost to you for this study.</p><p> There may be the potential to earn bonus pay based upon performance, or completion of the entire group of tasks. </p>",
          "<p><b>PARTICIPANT'S RIGHTS:</b></p><p> If you have read this form and have decided to participate in this project, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time without penalty or loss of benefits to which you are otherwise entitled. The alternative is not to participate. </p><p> You have the right to refuse to answer particular questions. The results of this research study may be presented at scientific or professional meetings or published in scientific journals.</p><p> Your individual privacy will be maintained in all published and written data resulting from the study. Identifiers might be removed from identifiable private information and, after such removal, the information could be used for future research studies or distributed to another investigator for future research studies without additional informed consent from you.",
          "<p><b>CONTACT INFORMATION:</b> </p><p> Questions: </p><p>  If you have any questions, concerns or complaints about this research, its procedures, risks and benefits, contact the Protocol Director, Dr. Russell Poldrack, at 650-497-8488.  </p><p> Independent Contact: </p><p> If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906, or email at irbnonmed@stanford.edu. </p><p>  You can also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306. </p><p>Please print a copy of this form for your records. </p><p> If you agree to participate in this research, please proceed to the study tasks.</p>"
     ],      
    // Define the button response
    key_forward: 'ArrowRight', // Define the key to move forward
    key_backward: 'ArrowLeft', // Define the key to move backward
    allow_backward: true, // Allow the participant to move backward
    button_label_previous: 'Back', // Define the label for the next button
    button_label_next: 'Next', // Define the label for the back button
    show_clickable_nav: 'True',

};
// Push consent to timeline
timeline.push(consent_instructions);

const consent = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>By pressing continue below, I understand that I am consenting to participation in this research.</p>",
    choices: ['Continue'],
    data: {category: 'consent'}
};
timeline.push(consent);
//------------------- 3. Instructions ------------------- //
// Instructions
const gram_instructions = {
    type: jsPsychInstructions, //name type of plugin
    pages: [
          "<p>In this study you will be presented with real words that have been scrambled into a string of letters</p>",
            "<p>It is your task to unscramble the letter string and type the real word into the box provided</p>",
            "<p>After you have typed your answer, press enter to submit your response.</p>",
            "<p>There is no time limit for each trial. However, the primary goal of the research is to understand how quickly you can solve the anagrams,</p> <p> so it's important that you respond as quickly as possible.</p>",
            "<p>If you get stuck on a trial, you can enter 'idk' into the box to continue.</p>",
            "<p>You will be asked to solve 150 of these scrambled words. Two rest breaks will be provided after each block of 50 </p>",
            "<p>We will not provide feedback about response time or correct answers. There is at least one correct answer for each scrambled word.</p>",
            "<p>We will however give a <b>bonus</b> for participants who submit correct answers for more than 80% of trials! Note: 'idk' responses will be considered mistakes. </p>",
            "<p>Press next for a <b>practice</b> trial.</p>"
     ],      
    // Define the button response
    key_forward: 'ArrowRight', // Define the key to move forward
    key_backward: 'ArrowLeft', // Define the key to move backward
    allow_backward: true, // Allow the participant to move backward
    button_label_previous: 'Back', // Define the label for the next button
    button_label_next: 'Next', // Define the label for the back button
    show_clickable_nav: 'True',
};
// Push instructions to timeline
timeline.push(gram_instructions);
// ----- Practice trial------
// This trial will be the same for every person
const practice_trial = {
    type: jsPsychAnagrammer,
    anagram: "rapctiec", // anagram on screen
    correct: "practice", // the correct answer that isn't shown
    id: "practice", // unique id for the trial
    set: "practice", // set name
    setRun: "practice", // set run order
    allow_blanks: false, // allow blanks in the response, it's a boolean
    check_answers: false, // check the answers, it's a boolean
    //trial_duration: 30000 , // ms for the trial duration ** for future debugging, this currently will be looped if the trials below don't have a duration, it defaults to this assignment
    prompt: 'Press enter to submit the <i>practice</i> trial', // prompt for the trials that is displayed under the enter box
}
timeline.push(practice_trial);

//--- Last page of instructions ---
const last_page = {
    type: jsPsychInstructions, //name type of plugin
    pages: [
            "<p>Great job! You have completed the practice trial.</p>",
            "<p>You will be presented with 3 blocks of 50 word scrambles with at least one correct answer. </p><p>Rest breaks will be provided in between these blocks.</p>",
            "<p>Press next to begin the main trials.</p>"
        ],
        key_forward: 'ArrowRight', // Define the key to move forward
        allow_backward: false, // Allow the participant to move backward
        button_label_next: 'Next', // Define the label for the back button 
        show_clickable_nav: 'True',
};
timeline.push(last_page);

// ------------------------------ 4. Main trials ---------------------------------------------------- //
// Setting up the timeline variables
// Grab proliferate URL group id to define the set assignment used to filter stimuli

// Get the URL path
const path = window.location.pathname;
// Extract the set identifier from the path
// Assuming the set identifier is always after the last '/' and before '/index.html'
const set_identifier = path.split('/').pop().replace('.html', ''); // this is modified now that we use symlink to organize 
// Define the set assignment based on the identifier
const setRun = set_identifier || 'SetA1';  // Default to 'SetA1' if not found

// Now we use that info in the create_tv_array function for filtering the stimuli set
// Function for creating the timeline variables array (TV_array) is in the util.js file
let tv_array = create_tv_array(trial_objects, setRun);
/// -----Time- conversion cheat sheet ------///
// 30 seconds = 30000 ms
// 1 minute = 60000 ms
// 3 minutes = 180000 ms
// 5 minutes = 300000 ms
// 10 minutes = 600000 ms
/// -----------------------------------------///
console.log(`The timeline has ${tv_array.length} trials`); // I want to see what is being used for the check answers. It is useing the valid but it's using it as a full string, not look for inside this string

// Block one //----------------
const blockA = {
    timeline: [
        {
            type: jsPsychAnagrammer,
            anagram: jsPsych.timelineVariable('text'),
            correct: jsPsych.timelineVariable('valid'), // confusing but correct means valid answers, but in the stimuli correct corresponds with the root of the shuffle
            id: jsPsych.timelineVariable('id'),
            set: jsPsych.timelineVariable('set'),
            setRun: jsPsych.timelineVariable('setRun'), // this is what determines the stimuli order
            allow_blanks: false,
            check_answers: true,
            mistake_fn: handleMistake,
            //trial_duration: 3000, // 3 seconds <- for debugging
            trial_duration: 60000, // 1 minute
            prompt: '<p>Press enter to continue</p>',
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + tv_array.length));
        
            }
        },

    ],
    timeline_variables: tv_array.slice(0, 50)
}
timeline.push(blockA);

// Resting page
const resting_page = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>Great job! You have completed the first block of trials.</p><p>Take a short break before continuing to the next block.</p>",
    trial_duration: 300000 , // 5 minutes
    choices: ['Continue'],
    data: {category: 'resting'}
};
timeline.push(resting_page);

// Block two //----------------
const blockB = {
    timeline: [
        {
            type: jsPsychAnagrammer,
            anagram: jsPsych.timelineVariable('text'),
            correct: jsPsych.timelineVariable('valid'), // confusing but correct means valid answers, but in the stimuli correct corresponds with the root of the shuffle
            id: jsPsych.timelineVariable('id'),
            set: jsPsych.timelineVariable('set'),
            setRun: jsPsych.timelineVariable('setRun'), // this is what determines the stimuli order
            allow_blanks: false,
            check_answers: true,
            mistake_fn: handleMistake,
            trial_duration: 60000, // 1 minute
            prompt: 'Press enter to continue',
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + tv_array.length));
        
            }
        },

    ],
    timeline_variables: tv_array.slice(50, 100)
}
timeline.push(blockB);
// Resting page
const resting_page1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>Great job! You have completed the second block of trials.</p><p>Take a short break before continuing to the final block.</p>",
    trial_duration: 300000 , // 5 minutes
    choices: ['Continue'],
    data: {category: 'resting'}
};
timeline.push(resting_page1);
// Block C //----------------
const blockC = {
    timeline: [
        {
            type: jsPsychAnagrammer,
            anagram: jsPsych.timelineVariable('text'),
            correct: jsPsych.timelineVariable('valid'), // confusing but correct means valid answers, but in the stimuli correct corresponds with the root of the shuffle
            id: jsPsych.timelineVariable('id'),
            set: jsPsych.timelineVariable('set'),
            setRun: jsPsych.timelineVariable('setRun'), // this is what determines the stimuli order
            allow_blanks: false,
            check_answers: true,
            mistake_fn: handleMistake,
            trial_duration: 60000, // 1 minute
            prompt: 'Press enter to continue',
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + tv_array.length));
        
            }
        },

    ],
    timeline_variables: tv_array.slice(100, 150)
}
timeline.push(blockC);
// End of the experiment pages ----------------
const end_confirm_subjid = {
    type: jsPsychAnagrammer,
    anagram: "Please confirm your Prolific ID by entering the last five digit",
    //correct: subject_id,
    id: "end_confirm_subjid",  
    set: "end_confirm_subjid",
    allow_blanks: false,
    check_answers: false,
    prompt: 'Press enter to see your results for this experiment',
}
timeline.push(end_confirm_subjid);

var results_page = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        return `<p>Thank you for participating! You scored ${((1-(mistakes/tv_array.length))*100).toFixed(2)} percent correct!</p>`
    }
}
timeline.push(results_page);

const end_page = {
    type: jsPsychInstructions, //name type of plugin
    pages: [
            "<p>Thank you for participating! Please copy the code on the next page for Prolific in case of disconnection.</p>",
            "<p>C1H2T2SP</p>"
        ],
        key_forward: 'ArrowRight', // Define the key to move forward
        allow_backward: false, // Allow the participant to move backward
        button_label_next: 'Next', // Define the label for the back button 
        show_clickable_nav: 'True',
};
timeline.push(end_page);
//------------------- 4. Push to proliferate / view ------------------- //
// Push to proliferate
jsPsych.run(timeline);
