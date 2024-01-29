import { JsPsych, JsPsychPlugin, ParameterType, TrialType } from "jspsych";
import gamejs from "./gamejs";
import { Tools } from "./tools.js";
import { VGDLParser } from "./vgdl-parser.js";
import $ from "jquery";

const info = {
  name: "vgdl-game",
  parameters: {
    game_description: {
      type: ParameterType.STRING,
      default: undefined,
    },
  },
};

class VGDLGamePlugin {
  constructor(jsPsych) {
    this.jsPsych = jsPsych;
    gamejs.preload(["assets/images/error.png"]);
  }

  trial(display_element, trial) {
    const game_description = trial.game_description;
    const vgdl_parser = VGDLParser(gamejs);
    const html = `
      <div id='header' class="Flex-Container">
        <h1 id="title">Play a game!</h1>
      </div>
      <div id='message'>
      </div>
      <div class="flex-buttons">
          <div class="flex-button" id='start-div'>
              <button id="start" class="jspsych-btn">Start</button>
              <button id="next" class="jspsych-btn">Next</button>
          </div>
      </div>
      <br/>
      <div id='game-body' class='Flex-Container'>
          <div id="gjs-loader">
            <progress max=1 min=0 steps=0.1></progress>
            <br/>Loading...
          </div>
          <canvas id="gjs-canvas"></canvas>

      </div>
    `;
    display_element.innerHTML = html;
    $("#next").hide();

    const game = vgdl_parser.playGame(
      game_description.descs[0],
      game_description.levels[0],
      0,
      // color_scheme,
    );

    let ended = false;

    const end_trial = (won) => {
      const trial_data = {
        stateHistory: game.gameStates,
        steps: game.steps,
        won: won,
      };
      this.jsPsych.finishTrial(trial_data);
    };

    const on_game_end = () => {
      game.paused = true;
      ended = true;
      $("#retry-div").remove();

      $("#next").show();
      if (game.win) {
        $("#title").text("Game Won!");
        $(document).on("click", "#next", () => {
          end_trial(true);
        });
      } else {
        $("#title").text("Game Lost!");
        $(document).on("click", "#next", () => {
          end_trial(false);
        });
      }
    };

    var begin_game = () => {
      $("#start").remove();
      game.paused = false;
    };

    $("#gjs-canvas").focus();
    $("#start").click(begin_game);

    game.paused = true;
    gamejs.ready(game.run(on_game_end));
  }
}
VGDLGamePlugin.info = info;

export default VGDLGamePlugin;
