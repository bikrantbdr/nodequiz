import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms=1500)=> new Promise((r)=> setTimeout(r,ms));

async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type:'input',   
        message:'What is your name?',
        default(){
            return 'Player';
        },
    })
    playerName=answers.player_name
}

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
      'Who Wants To Be A Millionaire? \n'
    );
  
    await sleep();
    rainbowTitle.stop();
  
    console.log(`
      ${chalk.bgBlue('HOW TO PLAY')} 
      If you get any question wrong you will ${chalk.bgRed('Die')} ☠️
      So get all the questions right...
    `);
  }

async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if(isCorrect){
        spinner.success({text: `Nice work ${playerName}`})
    }
    else{
        spinner.error({text:`☠️  Game over ☠️.
        You die!! 🔫💥`})
        process.exit(1);
    }
}

function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');
      process.exit(0);
    });
  }


async function question1() {
    const answers = await inquirer.prompt({
      name: 'question_1',
      type: 'list',
      message: 'Divide 30 by half and add ten. \n',
      choices: [
        '40.5',
        '50',
        '70',
        'I know this is a trick question, so NONE. Ha!',
      ],
    });
  
    return handleAnswer(answers.question_1 === '70');
  }
async function question2() {
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: 'The answer is really big. \n',
      choices: [
        'Elephant',
        'Really Big',
        'THE ANSWER',
        'The data given is insufficient.',
      ],
    });
  
    return handleAnswer(answers.question_2 === 'Really Big');
  }
async function question3() {
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: 'A farmer has 17 sheep, all of them but 8 die. How many sheep are still standing?  \n',
      choices: [
        '8',
        '9',
        '25',
        'None of the above.',
      ],
    });
  
    return handleAnswer(answers.question_3 === '8');
  }
async function question4() {
    const answers = await inquirer.prompt({
      name: 'question_4',
      type: 'list',
      message: `There are two clocks of different colors: The red clock is broken and doesn't run at all, 
      but the blue clock loses one second every 24 hours. Which clock is more accurate?   \n`,
      choices: [
        'The red clock.',
        'The blue clock.',
        'Neither',
        'Both ',
      ],
    });
  
    return handleAnswer(answers.question_4 === 'The red clock.');
  }

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await winner();