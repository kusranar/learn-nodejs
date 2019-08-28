function tambah(a, b){
    return a + b;
}

describe('Test with Jasmine', ()=>{
    it('2 + 5 expected 7', ()=>[
        expect(tambah(2,5)).toBe(8)
    ])
})