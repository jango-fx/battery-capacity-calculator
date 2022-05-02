//var parser = new Parser();

let battery = 2000;
let batteryMultiplier = 0.001;
let batteryInput;
let batteryUnitDropDown;

let load = 200;
let loadMultiplier = 0.001;
let loadInput;
let loadUnitDropDown;

let capacity;
let capacityMultiplier = 1;
let capacityInput;
let capacityUnitDropDown;

function setup() {
  let canvas = createCanvas(565, 200);
  canvas.parent(select('main'));

  batteryInput = createInput(String(battery));
  batteryInput.position(10, -30);
  batteryInput.size(60);
  batteryInput.changed(changeBatteryInput);
  batteryInput.parent(select('main'));

  batteryUnitDropDown = createSelect();
  batteryUnitDropDown.position(20, -30);
  batteryUnitDropDown.option("mAh");
  batteryUnitDropDown.option("Ah");
  batteryUnitDropDown.selected("mAh");
  batteryUnitDropDown.changed(selectBatteryUnits);
  batteryUnitDropDown.parent(select('main'));

  loadInput = createInput(String(load));
  loadInput.position(80, -30);
  loadInput.size(60);
  loadInput.changed(changeLoadInput);
  loadInput.parent(select('main'));

  loadUnitDropDown = createSelect();
  loadUnitDropDown.position(90, -30);
  loadUnitDropDown.option("uA");
  loadUnitDropDown.option("mA");
  loadUnitDropDown.option("A");
  loadUnitDropDown.selected("mA");
  loadUnitDropDown.changed(selectLoadUnits);
  loadUnitDropDown.parent(select('main'));

  capacityInput = createInput("");
  capacityInput.position(160, -30);
  capacityInput.size(60);
  capacityInput.input(changeCapacityInput);
  capacityInput.attribute("readonly", "true");
  //capacityInput.attribute('disabled', 'true');
  capacityInput.parent(select('main'));

  capacityUnitDropDown = createSelect();
  capacityUnitDropDown.position(170, -30);
  capacityUnitDropDown.option("Minutes");
  capacityUnitDropDown.option("Hours");
  capacityUnitDropDown.option("Days");
  capacityUnitDropDown.option("Months");
  capacityUnitDropDown.option("Years");
  capacityUnitDropDown.changed(selectCapacityUnits);
  capacityUnitDropDown.selected("Hours");
  capacityUnitDropDown.parent(select('main'));
  
  compute();
}

function draw() {
  background(255);
  textSize(100);
  text("🔋", 25, 120);
  text("/", 160, 120);
  text("🤖", 225, 120);
  text("=", 350, 120);
  text("⏱", 425, 120);
}

function changeBatteryInput() {
  //var expression = Parser.parse(this.value());
  //var result = expression.evaluate({ x: 3 });

  battery = eval(this.value()); //result;//this.value();
  compute();
}
function selectBatteryUnits() {
  if (this.value() == "mAh") {
    batteryMultiplier = 0.001;
  }
  if (this.value() == "Ah") {
    batteryMultiplier = 1;
  }
  compute();
}

function changeLoadInput() {
  load = eval(this.value());
  compute();
}
function selectLoadUnits() {
  if (this.value() == "uA") {
    loadMultiplier = 0.001 * 0.001;
  }
  if (this.value() == "mA") {
    loadMultiplier = 0.001;
  }
  if (this.value() == "A") {
    loadMultiplier = 1;
  }
  compute();
}

function changeCapacityInput() {}
function selectCapacityUnits() {
  if (this.value() == "Minutes") {
    capacityMultiplier = 60.0;
  }
  if (this.value() == "Hours") {
    capacityMultiplier = 1.0;
  }
  if (this.value() == "Days") {
    capacityMultiplier = 1.0 / 24;
  }
  if (this.value() == "Months") {
    capacityMultiplier = (1.0 / 24 / 365) * 12;
  }
  if (this.value() == "Years") {
    capacityMultiplier = 1.0 / 24 / 365;
  }
  compute();
}

function compute() {
  //console.log("battery: ", battery, ", batteryMultiplier: ", batteryMultiplier);
  //console.log("load: ", load, ", loadMultiplier: ", loadMultiplier);
  //console.log("capacityMultiplier: ", capacityMultiplier);

  capacity = (battery * batteryMultiplier) / (load * loadMultiplier);
  capacity = capacity * capacityMultiplier;

  //console.log("capacity: ", capacity);

  capacityInput.attribute("value", capacity);
}
