import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Button,
  Container,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Roller = () => {
  const [objCount, setObjCount] = useState(10);
  const [dc, setDc] = useState(15);

  const [attacksRolled, setAttacksRolled] = useState<Array<number>>([]);
  const [damageRolled, setDamageRolled] = useState<Array<number>>([]);

  const [size, setSize] = useState('tiny');

  const rollDice = (n: number) => {
    if (size === 'tiny') {
      fillDice(20, 1, 8, setAttacksRolled);
      fillDice(4, 1, 4, setDamageRolled);
    } else if (size === 'small') {
      fillDice(20, 1, 6, setAttacksRolled);
      fillDice(8, 1, 2, setDamageRolled);
    } else if (size === 'medium') {
      fillDice(20, 1, 5, setAttacksRolled);
      fillDice(6, 2, 1, setDamageRolled);
    } else if (size === 'large') {
      fillDice(20, 1, 6, setAttacksRolled);
      fillDice(10, 2, 2, setDamageRolled);
    } else if (size === 'huge') {
      fillDice(20, 1, 8, setAttacksRolled);
      fillDice(12, 2, 4, setDamageRolled);
    }
  };

  const fillDice = (
    dice: number,
    diceCount: number,
    bonus: number,
    setFunc: (x: Array<number>) => void
  ) => {
    let newNumbers: number[] = [];
    for (let i = 0; i < objCount; i++) {
      const sum = Array.from(Array(diceCount)).map(f => {
        return Math.floor(Math.random() * dice) + 1 + bonus;
      }).reduce((a, c) => a + c);
      newNumbers.push(sum);
    }
    setFunc(newNumbers);
  };

  const zippedArray = attacksRolled.map((elem, index) => [elem, damageRolled[index]]);

  let totalDamage = 0;
  if (zippedArray.length > 0) {
    totalDamage = zippedArray
      .filter(pair => pair[0] >= dc)
      .map((pair) => pair[1])
      .reduce((a, c) => a + c);
  }

  const getRowColor = (attackRoll: number): string => {
    return attackRoll >= dc ? 'table-success' : 'table-danger';
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label for="objCount">Objects:</Label>
          <Input
            type="number"
            name="objCount"
            id="objCount"
            value={objCount}
            onChange={(e) => {
              setObjCount(parseInt(e.target.value));
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="dc">AC:</Label>
          <Input
            type="number"
            name="dc"
            id="dc"
            value={dc}
            onChange={(e) => {
              setDc(parseInt(e.target.value));
            }}
          />
        </FormGroup>
        <FormGroup>
            <Label for="size">Size:</Label>
            <Input
                type="select"
                name="size"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
            >
                <option value="tiny">Tiny</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="huge">Huge</option>
            </Input>
        </FormGroup>
        <Button color="primary" onClick={() => rollDice(objCount)}>Roll Dice</Button>
      </Form>
      {totalDamage !== 0 && <div className="mt-4">
        <Table>
          <thead>
            <tr>
              <th>Attack Roll</th>
              <th>Damage</th>
            </tr>
          </thead>
          <tbody>
            {zippedArray.map((num, index) => (
                <tr className={getRowColor(num[0])} key={index}>
                    <td>{num[0]}</td>
                    <td>{num[1]}</td>
                </tr>
            ))}
          </tbody>
        </Table>
        <div><h3>Total Damage: {totalDamage}</h3></div>
      </div>}
    </Container>
  );
};

export default Roller;