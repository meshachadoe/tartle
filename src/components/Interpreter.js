const validFnc = [
  { name: "move", paramRequired: true },
  { name: "turn", paramRequired: true },
  { name: "penUp", paramRequired: false },
  { name: "penDown", paramRequired: false }
];

const turtleTemplate = {
  x: 250,
  y: 250,
  angle: 0,
  penDown: false,
  index: 0
};

export const errorCheck = (command, ind) => {
  if (command == "") return { status: true, msg: "skip", index: ind };
  let parStack = 0;
  let parCount = 0;
  for (let i = 0; i < command.length; i++) {
    if (command[i] === "(") parStack++;
    if (command[i] === ")") {
      parStack--;
      parCount++;
    }
    if (parStack < 0)
      return { status: false, msg: "Invalid Parenthesis (1)", index: ind };
  }
  if (parStack != 0)
    return { status: false, msg: "Invalid Parenthesis (2)", index: ind };
  if (parCount != 1)
    return { status: false, msg: "Invalid Parenthesis (3)", index: ind };

  let fnc = "";
  let param = "";

  let deconstructed = command.split(/[()]/);

  fnc = deconstructed[0];
  param = deconstructed[1];

  if (deconstructed[2] != "")
    return { status: false, msg: "Invalid Function (4)", index: ind };

  let isValid = false;

  for (let i = 0; i < validFnc.length; i++) {
    if (fnc == validFnc[i].name) {
      isValid = true;
      let isParamEmpty = param == "";
      if (isParamEmpty == validFnc[i].paramRequired)
        return { status: false, msg: "Invalid Parameter(5)", index: ind };
      break;
    }
  }

  if (!isValid) {
    return { status: false, msg: "invalid Function(6)", index: ind };
  }

  if (param != "" && isNaN(param))
    return { status: false, msg: "Invalid Parameter(7)", index: ind };
  if (param != "" && Math.round(param) != param)
    return { status: false, msg: "Invalid Parameter(8)", index: ind };

  param = parseInt(param);

  return { status: true, param: param, fnc: fnc, index: ind };
};

export const convertCommandsToSteps = commands => {
  let steps = [];
  steps.push({ ...turtleTemplate });
  commands.forEach(item => {
    let newTurtle = { ...steps[steps.length - 1] };
    if (item.fnc === "move") {
      let limit = Math.abs(item.param) * 5;
      let negative = item.param < 0;

      for (let i = 0; i <= limit; i += 5) {
        let newTurtle = { ...steps[steps.length - 1] };
        const distance = negative ? -5 : 5;
        steps.push(move(newTurtle, distance, item.index));
      }
    } else if (item.fnc === "turn")
      steps.push(turn(newTurtle, item.param, item.index));
    else if (item.fnc === "penUp") steps.push(penUp(newTurtle, item.index));
    else if (item.fnc === "penDown") steps.push(penDown(newTurtle, item.index));
  });
  return steps;
};

const move = (turtle, amount, index) => {
  turtle.x = turtle.x + amount * sin(turtle.angle);
  turtle.y = turtle.y - amount * cos(turtle.angle);
  turtle.index = index;
  return turtle;
};

const turn = (turtle, amount, index) => {
  turtle.angle += amount;
  if (turtle.angle >= 360) turtle.angle -= 360;
  if (turtle.angle <= -360) turtle.angle += 360;
  turtle.index = index;
  return turtle;
};

const penDown = (turtle, index) => {
  turtle.penDown = true;
  turtle.index = index;
  return turtle;
};

const penUp = (turtle, index) => {
  turtle.penDown = false;
  turtle.index = index;
  return turtle;
};

const sin = d => Math.sin((d * Math.PI) / 180);
const cos = d => Math.cos((d * Math.PI) / 180);
