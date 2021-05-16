# Front-End test

Test package based on a repo
Repo contains some assets, like a font to be imported and some game assets (SVGs). Wireframes are also included to guide the candidate.
Repo should be forked and returned as a repo link.

## Candidate notes:
We want you to implement a standard web page, regarding the above Layout Specification section and the wireframes provided on the "Design Specs" folder. We also provide you an assets folder, where you can find all you need to accomplish the layout execution, including a font and some images. As you should have noticed, there is also a "Color palette" file on the Design specs folder for saving your time. However, feel free to edit the layout and decorate it as you want. Animations are welcome too. The only requirements for the included assets pack are the usage of the custom font and the gaming assets you may need.
Also, you're free to add as many tools as you need to the project, such as Grunt, Gulp, Webpack, or npm/yarn dependencies.
In case of adding some task runner or specific tools, please include the documentation you find significant.  If you simply want to write in ES6, it's ok to ignore the transpiler. We can live with that for this test.
Usage of frameworks like Angular, React or VueJS are also up to you. Ok, now this is a joke. You will not need this stuff at all for now.
Do not forget we all have phones and may want to play your awesome game during coffee time. 


## Layout Specifications

\**Except Header and Footer, all sections should be full screen.*

### Section 1
- Top header featuring SWORD logo.
- Should be fixed during site navigation
- Background should become transparent after 150 pixels
___
### Section 2
- Follow the design specification included on the repository to build your profile;
___
### Section 3
- Follow provided wireframes to implement a Tic-tac-toe game.
 
 **Basic section requirements:**
- Game board;
- Player Wins;
- Number of games played;
- Tic-tac-toe regular rules (First player to win 5 games wins);
- When one of the players reaches the needed amount of wins, page gives congrats and scrolls to next section;

##### Basic Game Requirements (add more features if you want):
- Detect victories;
- Highlight victory line and tokens;
- Count players wins;
- Save wins history;
- Time counter per game;

\**If you're feeling artistic today, do it. Enhance game aesthetics as you like.*
___
### Section 4

- Game final stats;
- Percentage of wins for each player with feedback color on values (green, yellow, red);
- History of game winners;
- Aggregated play time;
___
### Section 5
Footer with SWORD stuff and buttons to subscribe SWORD Games newsletter;

___
## Bonus Features
On Section 3, you can earn some extra respect points by either:

#### **Option 1:**
##### Dynamic grid tic-tac-toe
Select box to change game grid (3x3, 6x6, 9x9)

#### **Option 2:**
##### 4-in-a-row game
- Filter on top of game section (3) to toggle game with this being 4-in-a-row.
- Both games should be functional and respect the requirements stated above.



___
## Project documentation:

### Project setup
```
npm install
```

### Compiles and minifies for production
```
npm run build
```
or 
```
gulp
```
In any instance, you'll probably need to have gulp installed to be able to build.