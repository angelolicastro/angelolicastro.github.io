/*!
 * Copyright (c) 2025 Angelo Licastro
 * See LICENSE
 */
const randomNumberMin = 0;
const randomNumberMax = 10;
const availableOperators = ["+", "×"];

const challengeQuestionIdSpan = "challenge-question";
const challengeAnswerIdInput = "challenge-answer";
const challengeNoticeSpan = "challenge-notice";
const emailAddressIdSpan = "email-address";

const challengeTimeoutSeconds = 15;

const emailAddressIdent = "angelo";
const emailAddressHost = "angelolicastro";
const emailAddressDomain = "com";
const emailAddress = `${emailAddressIdent}@${emailAddressHost}.${emailAddressDomain}`;
const emailAddressHTML = `
  <a href="mailto:${emailAddress}">
    ${emailAddress}
  </a>
`;

function generateRandomNumber(min = randomNumberMin, max = randomNumberMax) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomItemFromArray(array) {
  if (array.length === 0) {
    return null;
  }

  let randomArrayIndex = generateRandomNumber(0, array.length - 1);
  return array[randomArrayIndex];
}

function generateRandomOperator(operators = availableOperators) {
  return pickRandomItemFromArray(operators);
}

function answerChallenge(leftOperand, operator, rightOperand) {
  if (operator === "+") {
    return leftOperand + rightOperand;
  } else if (operator === "×") {
    return leftOperand * rightOperand;
  } else {
    console.log(`Unknown operator: ${operator}`);
    return null;
  }
}

function renderChallengeQuestion(
  challengeQuestion,
  challengeQuestionId = challengeQuestionIdSpan
) {
  document.getElementById(challengeQuestionId).innerText = challengeQuestion;
}

function getChallengeAnswerIdElement(
  challengeAnswerId = challengeAnswerIdInput
) {
  return document.getElementById(challengeAnswerId);
}

function hookChallengeAnswerInput(challengeAnswer) {
  let challengeAnswerIdElement = getChallengeAnswerIdElement();
  challengeAnswerIdElement.oninput = function () {
    let challengeAttempt = parseInt(challengeAnswerIdElement.value);
    if (challengeAttempt === challengeAnswer) {
      renderEmailAddress();
    } else {
      renderChallengeNotice("Try again");
    }
  };
}

function renderEmailAddress(
  emailAddressId = emailAddressIdSpan,
  emailAddress = emailAddressHTML
) {
  let emailAddressIdElement = document.getElementById(emailAddressId);
  emailAddressIdElement.outerHTML = emailAddress;
}

function renderChallengeNotice(text, challengeNoticeId = challengeNoticeSpan) {
  let challengeNoticeIdElement = document.getElementById(challengeNoticeId);
  challengeNoticeIdElement.innerHTML = text;
}

function initialize() {
  if (getChallengeAnswerIdElement() === null) {
    return; // the challenge was solved already
  }

  let leftOperand = generateRandomNumber();
  let operator = generateRandomOperator();
  let rightOperand = generateRandomNumber();

  let challengeAnswer = answerChallenge(leftOperand, operator, rightOperand);

  let challengeQuestion = `${leftOperand} ${operator} ${rightOperand} =`;
  renderChallengeQuestion(challengeQuestion);

  hookChallengeAnswerInput(challengeAnswer);

  setTimeout(() => {
    initialize(); // present a new challenge after some time
    renderChallengeNotice("Please solve the new challenge");
  }, challengeTimeoutSeconds * 1000);
}

initialize();
