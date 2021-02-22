export interface IPrimoTopUp {
    cost: number;
    primogems: number;
    bonus: number;
}

const PrimoTopUp: Array<IPrimoTopUp> = [
    {
        cost: 0.99,
        primogems: 60,
        bonus: 0
    },
    {
        cost: 4.99,
        primogems: 300,
        bonus: 30
    },
    {
        cost: 14.99,
        primogems: 980,
        bonus: 110
    },
    {
        cost: 29.99,
        primogems: 1980,
        bonus: 260
    },
    {
        cost: 49.99,
        primogems: 3280,
        bonus: 600
    },
    {
        cost: 99.99,
        primogems: 6480,
        bonus: 1600
    }
]

export default PrimoTopUp;
