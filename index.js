const Alexa = require('ask-sdk-core');
const GENERAL_REPROMPT = `What would you like me to do now . else you can say help to know what you can do in this game`;
//const dynamoDBTableName = "STAYFITHUB_USER_REGISTER";
//....................................................................................
var overall_score=0;
var category=null;
var bmi_user=0;
var ideal_bmi=21;
var bmi_score=0;
var max_score=15;
var rank;
//....................................................................................
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    const speechText = `Hey there  Welcome to Fit and play . I can do a couple of things add  user,  view  user , update  user and explore the hub . Let me know how can i help you .`;
    const repromptText = `What would you like to do  You can say HELP to know available options`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  }
};

const AddUserIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AddUser';
    },
    async handle(handlerInput) {
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      const {responseBuilder } = handlerInput;
      const userId = handlerInput.requestEnvelope.context.System.user.userId;
      const username =handlerInput.requestEnvelope.request.intent.slots.Username.value;
      var height =handlerInput.requestEnvelope.request.intent.slots.Height.value;
      var weight =handlerInput.requestEnvelope.request.intent.slots.Weight.value;
      var height=height/100;
      var bmi_user=weight/(height*height);
      bmi_user=bmi_user.toFixed(2);
      attributes.bmi_user=bmi_user;
      attributes.username=username;
      attributes.height=height;
      attributes.weight=weight;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      return responseBuilder
            .speak(`${attributes.username} your details are succesfully added. so what you are waiting for ,just say explore the hub to start the game `)
            .reprompt(GENERAL_REPROMPT)
            .getResponse();
      }
};
const ViewUserIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'ViewUser';
      
    },
    async handle(handlerInput) {
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      const {responseBuilder } = handlerInput;
      const speechText =` Hello  ${attributes.username} ,according to your body height ${attributes.height} meter and weight ${attributes.weight} kg  Your body mass index is  ${attributes.bmi_user} . Now you can explore our fitness hub . so what you are waiting for ,just say explore the hub to start the game `;
  
          return responseBuilder
            .speak(speechText)
            .reprompt(GENERAL_REPROMPT)
            .getResponse();
        }
};

const UpdateUserIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'UpdateUser';
    },
    async handle(handlerInput) {
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      const {responseBuilder } = handlerInput;

       const username =handlerInput.requestEnvelope.request.intent.slots.Username.value;
       var height =handlerInput.requestEnvelope.request.intent.slots.Height.value;
       var height=height/100;
       var weight =handlerInput.requestEnvelope.request.intent.slots.Weight.value;
       bmi_user= weight/(height*height);
       bmi_user=bmi_user.toFixed(2);
       attributes.bmi_user=bmi_user;
       attributes.username=username;
       attributes.height=height;
       attributes.weight=weight;
       handlerInput.attributesManager.setSessionAttributes(attributes);
      const speechText=`Hello  ${attributes.username} ,according to your body height ${attributes.height} meter and weight ${attributes.weight} kg  Your body mass index is  ${attributes.bmi_user} . Now you can explore our fitness hub .  so what you are waiting for ,just say explore the hub to start the game `; 
      return responseBuilder
            .speak(speechText)
            .reprompt(GENERAL_REPROMPT)
            .getResponse();
    }
};
const AddUserHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'RawAdduser';
    },
    handle(handlerInput) {
        const speechText =`to add user please say as the next statement , i am username having height x cm and weight x kg. `;
        const repromptText =`listen carefully ,i am username having height x cm and weight x kg .`;

        return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  }
};
const UpdateUserHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'RawUpdateuser';
    },
    handle(handlerInput) {
        const speechText =`say as , update username by height x cm and weight x kg`;
        const repromptText =`listen carefully , update username by height x cm and weight x kg`;

        return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  }
};
const MunaoneHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'MunaMsgone';
    },
    handle(handlerInput) {
      const speechText = `you`;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
const MunatwoHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'MunaMsgtwo';
    },
    handle(handlerInput) {
      const speechText = `only you`;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
/*const MunathreeHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'MunaMsgthree';
    },
    handle(handlerInput) {
      const speechText = ``;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
const MunafourHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'MunaMsgfour';
    },
    handle(handlerInput) {
      const speechText = ``;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
const MunafiveHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'MunaMsgfive';
    },
    handle(handlerInput) {
      const speechText = ``;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};*/
const MainHelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      const speechText = `Hello ${attributes.username} in which u need help , stay fit hub or userdetails`;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
const QuizHelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'QuizHelp';
    },
    handle(handlerInput) {
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      const speechText = `Hello ${attributes.username} !! you can start the fitness hub by saying explore the hub !! only after adding yourself as a user so that we can track your fitness,<break time="1s"/>
                      where you will find 5 multiple choice question with different options  and, you have to answer them by saying the options like a, b, c or d.
                      you have only , 3 lifelines !! to protect our fitness hub, but , for every wrong answer you have to perform an exercise, along with countdown.
                      No questions will be repeat in order to avoid cheating, So be carefully and respond quickly.
                      you can quit the game anytime by saying "Exit".<break time="1s"/>`;
                      
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
const UserHelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'UserHelp';
    },
    handle(handlerInput) {
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      const speechText = `Hello ${attributes.username} !! you have to register your details, by saying add user , you can update it any time by saying update details and , view them by saying view details ,after adding details you can proceed to, stay fit hub by saying, explore the hub  `;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name ==='AMAZON.CancelIntent'
          || handlerInput.requestEnvelope.request.intent.name ==='AMAZON.StopIntent');
    },
    handle(handlerInput) {
      const speechText = `Thank you for being part of stay fit hub.<break time="1s"/> Add it to your daily routine to stay calm and fit.`;

      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type ==='SessionEndedRequest';
    },
    handle(handlerInput) {
      console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

      return handlerInput.responseBuilder.getResponse();
    }
};
const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);

      return handlerInput.responseBuilder
        .speak(`Sorry, am not getting you , you can relaunch the skill.`)
        .getResponse();
    }
};
const QuizHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log("Inside QuizHandler");
    console.log(JSON.stringify(request));
    return request.type === "IntentRequest" &&
           request.intent.name === "QuizIntent";
  },
  handle(handlerInput) {
    console.log("Inside QuizHandler - handle");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;
    attributes.state = states.QUIZ;
    attributes.counter = 0;
    attributes.life= 3;
    attributes.quizScore = 0;
    const startQuizMessage = `<amazon:emotion name="excited" intensity="high">Hey  ${attributes.username}!! welcome to our fitness hub . </amazon:emotion><break time="0.5s"/> <amazon:emotion name="excited" intensity="low">Here i will try to make you health concious and play a game to make you fit , along with tracking your fitness.</amazon:emotion><break time="0.5s"/> <amazon:effect name="whispered">Oops <break time="1s"/> wait a second ,Someone is making noise there </amazon:effect> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/city_sidewalk.mp3"/><amazon:emotion name="disappointed" intensity="high">let me resolve that matter first.</amazon:emotion><break time="1s"/><amazon:emotion name="disappointed" intensity="high"><prosody rate="slow">I am feeling sorry  ${attributes.username} !! </prosody><prosody rate="medium">because before accepting you ,as a member of our fitness hub ,Our boss want to test your knowledge and fitness.</prosody></amazon:emotion><amazon:emotion name="excited" intensity="high">I know!! only you can prove our boss wrong ,by giving the correct answers. so!! what you are waiting for,</amazon:emotion><amazon:emotion name="excited" intensity="high"><prosody volume="x-loud"><prosody rate="medium"> let punch the boss on face by winning.</prosody></prosody></amazon:emotion><break time="3s"/> `;
    var question = askQuestion(handlerInput);
    var speakOutput = startQuizMessage + question;
    var repromptOutput = question;

    const item = attributes.quizItem;
    const property = attributes.quizProperty;

    if (supportsDisplay(handlerInput)) {
      const title = `Question #${attributes.counter}`;
      const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getQuestionWithoutOrdinal(property,item)).getTextContent();
      const backgroundImage = new Alexa.ImageHelper().addImageInstance(getBackgroundImage(attributes.quizItem.Abbreviation)).getImage();
      const itemList = [];
      getAndShuffleMultipleChoiceAnswers(attributes.selectedItemIndex,item, property).forEach((x, i) => {
        itemList.push(
          {
            "token" : x,
            "textContent" : new Alexa.PlainTextContentHelper().withPrimaryText(x).getTextContent(),
          }
        );
      });
      response.addRenderTemplateDirective({
        type : 'ListTemplate1',
        token : 'Question',
        backButton : 'hidden',
        backgroundImage,
        title,
        listItems : itemList,
      });
    }

    return response.speak(speakOutput)
                   .reprompt(repromptOutput)
                   .getResponse();
  },
};
const QuizAnswerHandler = {
  canHandle(handlerInput) {
    console.log("Inside QuizAnswerHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return attributes.state === states.QUIZ &&
           request.type === 'IntentRequest' &&
           request.intent.name === 'AnswerIntent';
  },
  handle(handlerInput) {
    console.log("Inside QuizAnswerHandler - handle");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;
    //...........................................................................................
    if(attributes.bmi_user > 25)
     category="Over Weight";
    else if(attributes.bmi_user < 19)
     category="Under Weight";
        else
          category="Fit";
    ideal_bmi=21.0;
    var diff=Math.abs(ideal_bmi-attributes.bmi_user);
    bmi_score=Math.abs(10-diff);
    //...........................................................................................
    var speakOutput = ``;
    var repromptOutput = ``;
    const item = attributes.quizItem;
    const property = attributes.quizProperty;
    const uname =attributes.username;

    const isCorrect = compareSlots(handlerInput.requestEnvelope.request.intent.slots,item[property]);

    if (isCorrect) {
      speakOutput = getSpeechCon(true);
      speakOutput += getTrueAnswer(property, item);
      attributes.quizScore += 1;
      handlerInput.attributesManager.setSessionAttributes(attributes);
    } else {
      speakOutput = getSpeechCon(false);
      speakOutput += getWrongAnswer(property, item);
       attributes.life -= 1;
    }
//----------------------------------------------------------------------------------------------------------------------------------------------

    var question = ``;
    //IF YOUR QUESTION COUNT IS LESS THAN 10, and life is less than  5 WE NEED TO ASK ANOTHER QUESTION.
    if (attributes.counter < 5 && attributes.life>0) {
      speakOutput += getCurrentScore(attributes.quizScore,attributes.counter ,attributes.life);
      question = askQuestion(handlerInput);
      speakOutput += question;
      repromptOutput = question;

      if (supportsDisplay(handlerInput)) {
        const title = `Question #${attributes.counter}`;
        const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getQuestionWithoutOrdinal(attributes.quizProperty, attributes.quizItem)).getTextContent();
        const backgroundImage = new Alexa.ImageHelper().addImageInstance(getBackgroundImage(attributes.quizItem.Abbreviation)).getImage();
        const itemList = [];
        getAndShuffleMultipleChoiceAnswers(attributes.selectedItemIndex, attributes.quizItem, attributes.quizProperty).forEach((x, i) => {
          itemList.push(
            {
              "token" : x,
              "textContent" : new Alexa.PlainTextContentHelper().withPrimaryText(x).getTextContent(),
            }
          );
        });
        response.addRenderTemplateDirective({
          type : 'ListTemplate1',
          token : 'Question',
          backButton : 'hidden',
          backgroundImage,
          title,
          listItems : itemList,
        });
      }
      return response.speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
    }
    else {
      if(attributes.life == 0)
      {  speakOutput += getLostGame() +getFinalScore(attributes.quizScore,attributes.counter,uname) + exitSkillMessage; }
      else
          { speakOutput += getFinalScore(attributes.quizScore,attributes.counter,uname) + getRewardText() + exitSkillMessage;}
      if(supportsDisplay(handlerInput)) {
        const title = 'Thank you for playing';
        const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getFinalScore(attributes.quizScore,attributes.counter,uname)).getTextContent();
        response.addRenderTemplateDirective({
          type : 'BodyTemplate1',
          backButton: 'hidden',
          title,
          textContent: primaryText,
        });
      }
      return response.speak(speakOutput).getResponse();
    }
  },
};
const RepeatHandler = {
  canHandle(handlerInput) {
    console.log("Inside RepeatHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return attributes.state === states.QUIZ &&
           request.type === 'IntentRequest' &&
           request.intent.name === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    console.log("Inside RepeatHandler - handle");
    const attributes = handlerInput.attributesManager.getSessionAttributes();

    return handlerInput.responseBuilder
      .speak(`Sorry ${attributes.username} !!! We can't repeat, since we already mentioned that you have to listen carefully and respond quicky.We are doing this for avoiding cheating.Thank you for playing all the best for next time. `)
      .getResponse();
  },
};
const imagePath ="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/{0}x{1}/{2}._TTH_.png";
const backgroundImagePath ="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/{0}x{1}/{2}._TTH_.png";
const speechConsCorrect = [ 'Bravo',  'Cheers', 'Hurray', 'Oh dear. Just kidding.  Hurray','Well done', 'Woo hoo', 'Yay','aww yeah','excellent','good','great','well','woo hoo'];
const speechConsWrong = ['Argh', 'ugh','uh oh', 'Mamma mia', 'Oh boy','Oh dear', 'Oof', 'Ouch', 'Shucks','oops','jeez',''];

const data = [

 // {StateName: ' <audio src="https://skill-sound-libraries.s3.us-east-2.amazonaws.com/zapsplat_animals_lion_roar_growl_002_1991Amp3" />', Abbreviation: 'WY', Animal: 'Cheyenne', StatehoodYear: 1890,StatehoodOrder: 44},
  {StateName: `Which of the following health benefits would result from regular walking?<break time="0.3s"/> A <break time="0.3s"/> Increased blood pressure <break time="0.3s"/> B <break time="0.3s"/> Decreased risk of CHD <break time="0.3s"/> C <break time="0.3s"/> Increased resting heart rate <break time="0.3s"/> D <break time="0.3s"/> Decreased life expectancy`, Animal:'D'},
  {StateName: 'The development of balance would be required for which of the following activities?<break time="0.3s"/> A <break time="0.3s"/> Gymnastics<break time="0.3s"/> B <break time="0.3s"/> Sprinting <break time="0.3s"/>C <break time="0.3s"/> Swimming <break time="0.3s"/> D <break time="0.3s"/>Running', Animal: 'A'},
  {StateName: 'Which of the following is a long term adaptation to muscular strength training? <break time="0.3s"/> A <break time="0.3s"/>Increased size of type eleven muscle fibres <break time="0.3s"/>B <break time="0.3s"/> Decreased number of type eleven muscle fibres <break time="0.3s"/> C <break time="0.3s"/> Increased number of type eleven muscle fibres <break time="0.3s"/>D<break time="0.3s"/> Decreased size of type eleven muscle fibres', Animal: 'A'},
  {StateName: 'What is the definition of muscular strength? The ability of muscles <break time="0.3s"/> A<break time="0.3s"/> to exert maximum force in one contraction<break time="0.3s"/> B<break time="0.3s"/> to exert minimum force in one contraction <break time="0.3s"/>C<break time="0.3s"/> to repeatedly exert maximum force<break time="0.3s"/> D<break time="0.3s"/> to repeatedly exert minimum force', Animal: 'A'},
  {StateName: 'Which of the following would be classified in the aerobic fitness zone?<break time="0.3s"/> A<break time="0.3s"/>  sixty five percent Max heart rate <break time="0.3s"/>B<break time="0.3s"/>  seventy five percent Max heart rate<break time="0.3s"/> C<break time="0.3s"/>  eighty five percent Max heart rate <break time="0.3s"/>D<break time="0.3s"/> ninety five percent Max heart rate', Animal: 'B'},
  {StateName: 'Which of the following is a long term adaptation to cardiovascular training?<break time="0.3s"/> A <break time="0.3s"/> Increased lactic acid accumulation<break time="0.3s"/> B<break time="0.3s"/> Decreased carbon dioxide removal<break time="0.3s"/> C<break time="0.3s"/>  Increased capillarisation <break time="0.3s"/> D<break time="0.3s"/> Decreased oxygen delivery', Animal: 'C'},
  {StateName: 'What body type has broad shoulders and a muscular build?<break time="0.3s"/> A<break time="0.3s"/>  Ectomorph <break time="0.3s"/>B<break time="0.3s"/>  Mesomorph<break time="0.3s"/> C<break time="0.3s"/>  Endomorph <break time="0.3s"/>D <break time="0.3s"/> Somatotype', Animal:'B'},
  {StateName: 'What is heart rate? <break time="0.3s"/>A<break time="0.3s"/>  The number of beats/contractions per minute <break time="0.3s"/>B<break time="0.3s"/>  The number of beats/ contractions per thirty seconds <break time="0.3s"/>C<break time="0.3s"/>  The volume of blood pumped from the heart in one contraction <break time="0.3s"/>D<break time="0.3s"/> The volume of blood pumped from the heart in one minute', Animal: 'A'},
  {StateName: 'Which of the following is defined as the volume of blood pumped from the heart in one contraction? <break time="0.3s"/>A<break time="0.3s"/>  Cardiac output<break time="0.3s"/> B<break time="0.3s"/> Stroke volume<break time="0.3s"/> C<break time="0.3s"/>  Heart rate<break time="0.3s"/> D<break time="0.3s"/>  Cardiac arrest', Animal: 'B'},
  {StateName: 'Complete the text with the missing word?   When someone begins exercising heart rate will________ This will allow a greater supply of blood and therefore oxygen to reach the working muscles.<break time="0.3s"/> A<break time="0.3s"/> Maintain <break time="0.3s"/> B<break time="0.3s"/>  Increase <break time="0.3s"/>C<break time="0.3s"/>  Decrease <break time="0.3s"/> D<break time="0.3s"/>  Regress', Animal: 'B'},
  {StateName: 'Why does blood pooling lead to an increased risk of fainting?<break time="0.3s"/> A<break time="0.3s"/>  a decrease in blood sugar <break time="0.3s"/>B<break time="0.3s"/>  an increase in blood sugar <break time="0.3s"/>C<break time="0.3s"/> an increase in the blood supply to the brain <break time="0.3s"/>D<break time="0.3s"/>  a decrease in the blood supply to the brain', Animal: 'D'},
  {StateName: 'An ability to cope with stressful situations in everyday life and to make good decisions is an example of which component of total fitness? <break time="0.3s"/>A<break time="0.3s"/>  Social fitness<break time="0.3s"/> B<break time="0.3s"/>  Medical fitness<break time="0.3s"/> C<break time="0.3s"/> Mental fitness <break time="0.3s"/>D<break time="0.3s"/>  Spiritual fitness', Animal: 'C'},
  {StateName: 'Which of the following defines balance?<break time="0.3s"/> A<break time="0.3s"/>  The ability to change the position of the entire body in space with speed and accuracy<break time="0.3s"/> B<break time="0.3s"/>  The ability of the body to remain centred over a base of support <break time="0.3s"/>C<break time="0.3s"/>  The ability to perform smooth and accurate movements<break time="0.3s"/> D<break time="0.3s"/> Distance by Time', Animal: 'B'},
  {StateName: 'Who had introduced yoga first time to the western world in a religion conference Chicago, America? <break time="0.3s"/>A<break time="0.3s"/>  Swami Vivekananda<break time="0.3s"/> B<break time="0.3s"/> Narendra Modi <break time="0.3s"/>C<break time="0.3s"/>  Maharshi Patanjali <break time="0.3s"/>D<break time="0.3s"/>  Baba Ramadeva', Animal: 'A'},
  {StateName: 'Which of the following is a genetic factor influencing an individual training potential?<break time="0.3s"/> A<break time="0.3s"/>  Diet <break time="0.3s"/>B<break time="0.3s"/>  Alcohol <break time="0.3s"/>C<break time="0.3s"/>  Smoking <break time="0.3s"/>D<break time="0.3s"/> Body type', Animal: 'D'},
  {StateName: 'Which of the following meals/foods would be high in carbohydrate?  <break time="0.3s"/> A<break time="0.3s"/> salad <break time="0.3s"/>B<break time="0.3s"/>  Sausages, bacon and fried tomatoes <break time="0.3s"/>C<break time="0.3s"/> Spaghetti Bolognese <break time="0.3s"/>D<break time="0.3s"/>  Poached eggs', Animal: 'C'},
  {StateName: 'Which of the following is a non-dairy source of protein?<break time="0.3s"/> A<break time="0.3s"/>  Beans <break time="0.3s"/>B<break time="0.3s"/>  Cheese <break time="0.3s"/>C<break time="0.3s"/>  Milk <break time="0.3s"/>D<break time="0.3s"/>  Yoghurt', Animal: 'A'},
  {StateName: 'Which of the following is a source of carbohydrates in the diet? <break time="0.3s"/>A<break time="0.3s"/>  Chicken <break time="0.3s"/>B<break time="0.3s"/>  Pasta <break time="0.3s"/>C<break time="0.3s"/>  Cheese <break time="0.3s"/>D<break time="0.3s"/> Lamb', Animal: 'B'},
  {StateName: 'Foods from the meat, poultry, fish dry beans, eggs and nuts group are an important source of ________? <break time="0.3s"/>A<break time="0.3s"/>  Iron <break time="0.3s"/>B<break time="0.3s"/>  Fiber <break time="0.3s"/>C<break time="0.3s"/> Beta Carotene <break time="0.3s"/>D<break time="0.3s"/>  Calcium', Animal: 'A'},
  {StateName: 'How many steps should we aim for every day? <break time="0.3s"/>A<break time="0.3s"/>  about one thousand <break time="0.3s"/>B<break time="0.3s"/>  about four thousand <break time="0.3s"/>C<break time="0.3s"/>  about ten thousand <break time="0.3s"/>D<break time="0.3s"/>  about twenty thousand', Animal: 'C'},
  {StateName: 'Which is not a good warm-up exercise? <break time="0.3s"/>A<break time="0.3s"/>  big arm circles <break time="0.3s"/>B<break time="0.3s"/>  foam rolling <break time="0.3s"/>C<break time="0.3s"/>  hamstring stretches <break time="0.3s"/>D<break time="0.3s"/>  high knees', Animal: 'C'},
  {StateName: 'Which should you apply if you think you have strained a muscle?<break time="0.3s"/> A<break time="0.3s"/>  ice <break time="0.3s"/>B<break time="0.3s"/>  heat <break time="0.3s"/>C<break time="0.3s"/>  pressure <break time="0.3s"/>D<break time="0.3s"/>  nothing', Animal: 'A'},
  {StateName: 'All of these daily activities are moderate exercise except which one: <break time="0.3s"/>A<break time="0.3s"/>  raking leaves <break time="0.3s"/>B<break time="0.3s"/>  vacuuming the house <break time="0.3s"/>C<break time="0.3s"/>  washing dishes <break time="0.3s"/>D<break time="0.3s"/>  walking the dog', Animal: 'C'},
  {StateName: 'Which is a benefit of being active? <break time="0.3s"/>A<break time="0.3s"/>  strong bones<break time="0.3s"/> B<break time="0.3s"/> diabetes prevention<break time="0.3s"/> C<break time="0.3s"/>  healthy blood pressure<break time="0.3s"/> D<break time="0.3s"/>  all of these', Animal: 'D'},
  {StateName: 'Its a myth that you should drink this much water every day:<break time="0.3s"/>A<break time="0.3s"/> five glasses <break time="0.3s"/>B<break time="0.3s"/>  four glasses <break time="0.3s"/>C<break time="0.3s"/>  eight glasses<break time="0.3s"/> D<break time="0.3s"/>  twelve glasses', Animal: 'C'},
  {StateName: 'How many hours of rest are recommended for muscles to heal after a workout? <break time="0.3s"/>A<break time="0.3s"/>  twelve<break time="0.3s"/> B<break time="0.3s"/>  twenty four <break time="0.3s"/>C<break time="0.3s"/>  forty eight<break time="0.3s"/> D<break time="0.3s"/> seventy two', Animal: 'C'},
  {StateName: 'Whats the most important piece of your workout gear? <break time="0.3s"/>A<break time="0.3s"/> heart-rate monitor <break time="0.3s"/>B<break time="0.3s"/>  supportive clothing <break time="0.3s"/>C<break time="0.3s"/>  good shoes <break time="0.3s"/>D<break time="0.3s"/>  padded socks ', Aminal: 'C'},
  {StateName: 'Whats an easy way to see if you are getting a moderately intense workout?<break time="0.3s"/> A<break time="0.3s"/> You can easily talk and sing. <break time="0.3s"/>B<break time="0.3s"/> You can talk, but you cannot sing.<break time="0.3s"/> C<break time="0.3s"/> You can get a word or two in between breaths<break time="0.3s"/> D<break time="0.3s"/> None of these', Aminal: 'B'},
  {StateName: 'How much weight can you safely lose in one week?<break time="0.3s"/> A<break time="0.3s"/> about zero point five to one pound<break time="0.3s"/> B<break time="0.3s"/> about one to two pounds <break time="0.3s"/>C<break time="0.3s"/> about five to ten <break time="0.3s"/>D<break time="0.3s"/> as much as you can', Aminal: 'A'},
  {StateName: 'When starting a exercise program, at which level of activity should you begin?<break time="0.3s"/> A <break time="0.3s"/>flexibility<break time="0.3s"/> B<break time="0.3s"/> low-intensity physical activity <break time="0.3s"/>C<break time="0.3s"/> moderate-intensity physical activity <break time="0.3s"/>D<break time="0.3s"/> never', Aminal: 'B'},
  {StateName: 'How much moderate exercise should kids and teens get every day? <break time="0.3s"/>A<break time="0.3s"/> ten minutes <break time="0.3s"/>B<break time="0.3s"/> twenty minutes<break time="0.3s"/> C<break time="0.3s"/> thirty minutes <break time="0.3s"/>D<break time="0.3s"/> sixty minutes', Aminal: 'D'},
 /*{StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},
  {StateName: ' ', Aminal: ' '},*/

];

const states = {
  START: `_START`,
  QUIZ: `_QUIZ`,
};



const exitSkillMessage = `<break time="2s"/>Thank you for playing .Stay !! Fit <break time="0.5s"/> the fitness hub!`;
 function supportsDisplay(handlerInput) {
  var hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
  return hasDisplay;
}

function getCurrentScore(score, counter,life) {
  return `<break time="0.5s"/><amazon:emotion name="excited" intensity="high"> ${score} out of ${counter} answers are correct and you have just ${life} more life left to pass the test.</amazon:emotion>`;
}

function getFinalScore(score, counter,uname) {
  
  overall_score=score+bmi_score;
  overall_score=overall_score.toFixed(0);
  max_score=15;
  var diff = Math.abs(max_score-overall_score);
  rank=diff+1;
  return `<break time="1s"/>Congratulation ${uname} !! You have given ${score} out of ${counter} answers correct with BMI score ${bmi_score}, So your Overall score on the leaderboard is ${overall_score} with a rank of ${rank} you are ${category} person .You just need ${diff} point to be on top. `;
}

function getRewardText(){
  return`<break time="1s"/> <amazon:emotion name="excited" intensity="high"> I knew that!!,  you are perfect for stay fit hub !!</amazon:emotion>`;
}

function getLostGame() {
  return `<break time="1s"/><amazon:emotion name="disappointed" intensity="high">Ohh god !!, you lose your chance ,still</amazon:emotion>`;
}

function getBackgroundImage(label, height = 1024, width = 600) {
  return backgroundImagePath.replace("{0}", height)
    .replace("{1}", width)
    .replace("{2}", label);
}
function formatCasing(key) {
  return key.split(/(?=[A-Z])/).join(' ');
}

function getQuestion(counter, property, item) {
  const qnstatement=[`${item.StateName}`];
  return `<break time="1s"/><audio
src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_01"/><break time="1s"/><amazon:emotion name="excited" intensity="high">${qnstatement}</amazon:emotion>`;
}
function getTrueAnswer(property, item) {
  const trueansstatement=[`Wow !! you are right`,
  `Cool !! you know many things`,
  `Awesome !!! you can save our hub`,
  `Now I can say your knowledge saved us from boss`
  /*`you save the ${item[property]} trainers from the Dinosaur`,
   `thank you for saving  ${item[property]} from the Dinosaur`*/];
  switch (property) {
    case 'Abbreviation':
      //return `The correct ${formatCasing(property)} is <say-as interpret-as='spell-out'>${item[property]}</say-as>. `;
      return `The correct option is <say-as interpret-as='spell-out'>${item[property]}</say-as>. `;
    default:
      return `<amazon:emotion name="excited" intensity="high">${trueansstatement[getRandom(0,trueansstatement.length-1)]} </amazon:emotion>`;
  }
}
function getWrongAnswer(property,item){
  const workout=['chair squat','bird dog','pushups','plank','squat','crunch','jumping jack','lunges','single leg deadlift','burpees','side plank','sit ups','bent knee pushup','bent knee crunches','side lunge','cross crunches','russian twist','high knees','dead bugs','bridge','shoulder press','plank to downward dog','twist abs','straight leg donkey kick','fore arm plank','bicycle crunch','leg extension','leg curl','calf raise','side lying hip abduction'];
  const wrongansstatement=[`sorry !! you are wrong . option ${item[property]} is  the correct one, so now you have to do ${workout[getRandom(0,workout.length-1)]} exercise untill the countdown ends <break time="3.5s"/> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/ready1.mp3"/><break time="1s"/><audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/part1.mp3"/>`,
                           `Better luck next time !! option  ${item[property]} is the right one , so  Let's start  ${workout[getRandom(0,workout.length-1)]} exercise  untill the countdown ends <break time="3.5s"/> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/ready1.mp3"/><break time="1s"/><audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/part2.mp3"/>`,
                           `sorry !! you are wrong . option ${item[property]} is  the correct one, so now you have to do ${workout[getRandom(0,workout.length-1)]} exercise untill the countdown ends <break time="3.5s"/> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/ready1.mp3"/><break time="1s"/><audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/part3.mp3"/>`,
                           `Better luck next time !! option  ${item[property]} is the right one , so  Let's start  ${workout[getRandom(0,workout.length-1)]} exercise  untill the countdown ends <break time="3.5s"/> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/ready1.mp3"/><break time="1s"/><audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/part4.mp3"/>`,
                           `sorry !! you are wrong . option ${item[property]} is  the correct one, so now you have to do ${workout[getRandom(0,workout.length-1)]} exercise untill the countdown ends <break time="3.5s"/> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/ready1.mp3"/><break time="1s"/><audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/part5.mp3"/>`,
                           `Better luck next time !! option  ${item[property]} is the right one , so  Let's start  ${workout[getRandom(0,workout.length-1)]} exercise  untill the countdown ends <break time="3.5s"/> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/ready1.mp3"/><break time="1s"/><audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/part6.mp3"/>`,
                           `sorry !! you are wrong . option ${item[property]} is  the correct one, so now you have to do ${workout[getRandom(0,workout.length-1)]} exercise untill the countdown ends <break time="3.5s"/> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/ready1.mp3"/><break time="1s"/><audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/part7.mp3"/>`,
                           `Better luck next time !! option  ${item[property]} is the right one , so  Let's start  ${workout[getRandom(0,workout.length-1)]} exercise  untill the countdown ends <break time="3.5s"/> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/ready1.mp3"/><break time="1s"/><audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/part8.mp3"/>`,
                           `sorry !! you are wrong . option ${item[property]} is  the correct one, so now you have to do ${workout[getRandom(0,workout.length-1)]} exercise untill the countdown ends <break time="3.5s"/> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/ready1.mp3"/><break time="1s"/><audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/part9.mp3"/>`,
                           `Better luck next time !! option  ${item[property]} is the right one , so  Let's start  ${workout[getRandom(0,workout.length-1)]} exercise  untill the countdown ends <break time="3.5s"/> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/ready1.mp3"/><break time="1s"/><audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/part10.mp3"/>`,
                           `sorry !! you are wrong . option ${item[property]} is  the correct one, so now you have to do ${workout[getRandom(0,workout.length-1)]} exercise untill the countdown ends <break time="3.5s"/> <audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/ready1.mp3"/><break time="1s"/><audio src="https://stay-fit-audio-files.s3.us-east-2.amazonaws.com/part11.mp3"/>`
  
  /*
  `  you lose our ${item[property]} `,
  `we do not expect to lose our little ${item[property]}`*/];
   return `<amazon:emotion name="disappointed" intensity="high">${wrongansstatement[getRandom(0,wrongansstatement.length-1)]}</amazon:emotion>`;
}

function getRandom(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

function askQuestion(handlerInput) {
  console.log("I am in askQuestion()");
  //GENERATING THE RANDOM QUESTION FROM DATA
  const random = getRandom(0, data.length - 1);
  const item = data[random];
  const propertyArray = Object.getOwnPropertyNames(item);
  const property = propertyArray[getRandom(1, propertyArray.length - 1)];

  //GET SESSION ATTRIBUTES
  const attributes = handlerInput.attributesManager.getSessionAttributes();

  //SET QUESTION DATA TO ATTRIBUTES
  attributes.selectedItemIndex = random;
  attributes.quizItem = item;
  attributes.quizProperty = property;
  attributes.counter += 1;

  //SAVE ATTRIBUTES
  handlerInput.attributesManager.setSessionAttributes(attributes);

  const question = getQuestion(attributes.counter, property, item);
  return question;


}
function compareSlots(slots, value) {
  for (const slot in slots) {
    if (Object.prototype.hasOwnProperty.call(slots, slot) && slots[slot].value !== undefined) {
      if (slots[slot].value.toString().toLowerCase() === value.toString().toLowerCase()) 
      {
        return true;
      }
    }
  }

  return false;
}
function getSpeechCon(type) 
{
  if (type) return `<say-as interpret-as='interjection'>${speechConsCorrect[getRandom(0, speechConsCorrect.length - 1)]}! </say-as><break strength='strong'/>`;
     return `<say-as interpret-as='interjection'>${speechConsWrong[getRandom(0,speechConsWrong.length - 1)]} </say-as><break strength='strong'/>`;
}
function getAndShuffleMultipleChoiceAnswers(currentIndex, item, property) 
{
  return shuffle(getMultipleChoiceAnswers(currentIndex, item, property));
  }
function getMultipleChoiceAnswers(currentIndex, item, property) 
{

  // insert the correct answer first
  let answerList = [item[property]];
  // There's a possibility that we might get duplicate answers
  // 8 states were founded in 1788
  // 4 states were founded in 1889
  // 3 states were founded in 1787
  // to prevent duplicates we need avoid index collisions and take a sample of
  // 8 + 4 + 1 = 13 answers (it's not 8+4+3 because later we take the unique
  // we only need the minimum.)
  let count = 0;
  let upperBound = 12;

  let seen = new Array();
  seen[currentIndex] = 1;

  while (count < upperBound) {
    let random = getRandom(0, data.length - 1);

    // only add if we haven't seen this index
    if ( seen[random] === undefined ) {
      answerList.push(data[random][property]);
      count++;
    }
  }

  // remove duplicates from the list.
  answerList = answerList.filter((v, i, a) => a.indexOf(v) === i);
  // take the first three items from the list.
  answerList = answerList.slice(0, 3);
  return answerList;
}
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while ( 0 !== currentIndex ) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    AddUserIntentHandler,
    ViewUserIntentHandler,
    UpdateUserIntentHandler,
    AddUserHandler,
    UpdateUserHandler,
    MainHelpIntentHandler,
    QuizHelpIntentHandler,
    UserHelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    QuizHandler,
    QuizAnswerHandler,
    RepeatHandler,
    MunaoneHandler,
    MunatwoHandler,
    //MunathreeHandler,
    //MunafourHandler,
    //MunafiveHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
