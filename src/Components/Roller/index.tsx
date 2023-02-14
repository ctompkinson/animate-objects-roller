import React, {useState} from 'react'

const Roller = () => {
    const [objCount, setObjCount] = useState(10)
    const [dc, setDc] = useState(10)

    const [attacksRolled, setAttacksRolled] = useState<Array<number>>([])
    const [damageRolled, setDamageRolled] = useState<Array<number>>([])

    const [size, setSize] = useState("small")

    const rollDice = (n: number) => {
        if (size === 'tiny') {
            fillDice(20, 1, 8, setAttacksRolled)
            fillDice(4, 1, 4, setDamageRolled)
        } else if (size === 'small') {
            fillDice(20, 1, 6, setAttacksRolled)
            fillDice(8, 1, 2, setDamageRolled)
        } else if (size === 'medium') {
            fillDice(20, 1, 5, setAttacksRolled)
            fillDice(6, 2, 1, setDamageRolled)
        } else if (size === 'large') {
            fillDice(20, 1, 6, setAttacksRolled)
            fillDice(10, 2,  2, setDamageRolled)
        } else if (size === 'huge') {
            fillDice(20, 1, 8, setAttacksRolled)
            fillDice(12, 2, 4, setDamageRolled)
        }
    };

    const fillDice = (dice: number, diceCount: number, bonus: number, setFunc: (x: Array<number>) => void) => {
        let newNumbers: number[] = [];
        for (let i = 0; i < objCount; i++) {
            const sum = Array.from(Array(diceCount)).map(f => {
                return Math.floor(Math.random() * dice) + 1 + bonus;
            }).reduce((a, c) => a + c)
            newNumbers.push(sum);
        }
        setFunc(newNumbers);
    }


    const zippedArray = attacksRolled.map((elem, index) => [elem, damageRolled[index]]);

    let totalDamage = 0
    if (zippedArray.length > 0) {
        totalDamage = zippedArray
            .filter(pair => pair[0] >= dc)
            .map((pair) => pair[1])
            .reduce((a, c) => a + c)
    }

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>Objects:
                    <input type="number" name="name" value={objCount} onChange={(e) => {
                        setObjCount(parseInt(e.target.value))
                    }}/>
                </label>
                <label>AC:
                    <input type="number" name="name" value={dc} onChange={(e) => {
                        setDc(parseInt(e.target.value))
                    }}/>
                </label>
                <div>
                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value="tiny">Tiny</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="huge">Huge</option>
                    </select>
                </div>
                <button onClick={() => rollDice(objCount)}>Roll Dice</button>
            </form>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Attack Roll</th>
                        <th>Damage</th>
                    </tr>
                    </thead>
                    <tbody>
                        {zippedArray.map((num, index) => (
                            <tr>
                                <td>{num[0]}</td>
                                <td>{num[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>Total Damage: {totalDamage}</div>
            </div>
        </div>
    )
}

export default Roller
