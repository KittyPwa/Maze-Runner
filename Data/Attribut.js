function Attribut(attribut, value, maxValue) {

    this.type = attribut

    this.key = attribut.name

    this.minValue = attribut.minValue

    this.maxValue = maxValue;

    this.modifiedMaxValue = maxValue;

    this.currentValue = value;

    this.critique = false;
}

function Endurance() {
    this.name = 'endurance'

    this.minValue = 0;

    this.consumeAmount = 1;

    //this.gainAmount = 0.5;

    this.gainAmount = 5;

    this.exhausted = false;
}

function Speed() {
    this.name = 'speed'

    this.minValue = 0.5;
}

function Health() {
    this.name = 'health'

    this.minValue = 0;
}