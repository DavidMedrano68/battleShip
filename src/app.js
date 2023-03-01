import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faXmark, faO } from "@fortawesome/free-solid-svg-icons";
import "../src/styles.css";
import Game from "../classes/gameLoop.js";
library.add(faXmark, faO);
dom.watch();
const game = new Game();
game.init();
