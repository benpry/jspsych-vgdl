/**
 * @title jspsych-vgdl
 * @description Running vgdl games in jspsych
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import InstructionsText from "@jspsych/plugin-instructions";
import SurveyText from "@jspsych/plugin-survey-text";
import PreloadPlugin from "@jspsych/plugin-preload";
import { exampleVGDLGames } from "./example-games";
import { initJsPsych } from "jspsych";
import PluginVGDLGame from "./plugin-vgdl-game";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
  const jsPsych = initJsPsych();

  const timeline = [];

  timeline.push({
    type: InstructionsText,
    pages: [
      `<h1>Consent form and instructions</h1>
      <p>In this experiment, you will read a description of a game, play the game, then write a description of the game.</p>`,
    ],
    show_clickable_nav: true,
  });

  timeline.push({
    type: InstructionsText,
    pages: [
      `<h1>View Message</h1>
      <p>[A message from the model / another human / etc. would go here, depending on condition.]</p>`,
    ],
    show_clickable_nav: true,
  });

  // Preload assets
  timeline.push({
    type: PluginVGDLGame,
    game_description: exampleVGDLGames[0],
  });

  timeline.push({
    type: SurveyText,
    questions: [
      {
        prompt: "Please describe the game you just played.",
        required: true,
        rows: 15,
        columns: 60,
      },
    ],
  });

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
