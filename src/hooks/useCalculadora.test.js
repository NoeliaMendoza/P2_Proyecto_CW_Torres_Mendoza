import { describe, it, expect } from 'vitest';
import { parsearFormula } from './useCalculadora';

describe('parsearFormula', () => {

    it('parsea un elemento simple', () => {
        expect(parsearFormula('H')).toEqual({ H: 1 });
    });

    it('parsea elemento con subíndice', () => {
        expect(parsearFormula('O2')).toEqual({ O: 2 });
    });

    it('parsea H2O correctamente', () => {
        expect(parsearFormula('H2O')).toEqual({ H: 2, O: 1 });
    });

    it('parsea NaCl correctamente', () => {
        expect(parsearFormula('NaCl')).toEqual({ Na: 1, Cl: 1 });
    });

    it('parsea CO2 correctamente', () => {
        expect(parsearFormula('CO2')).toEqual({ C: 1, O: 2 });
    });

    it('parsea Ca(OH)2 con paréntesis', () => {
        expect(parsearFormula('Ca(OH)2')).toEqual({ Ca: 1, O: 2, H: 2 });
    });

    it('parsea Al2(SO4)3 con paréntesis y coeficientes', () => {
        expect(parsearFormula('Al2(SO4)3')).toEqual({ Al: 2, S: 3, O: 12 });
    });

    it('parsea C6H12O6 (glucosa)', () => {
        expect(parsearFormula('C6H12O6')).toEqual({ C: 6, H: 12, O: 6 });
    });

    it('retorna null para fórmula vacía', () => {
        expect(parsearFormula('')).toBeNull();
    });

    it('retorna objeto vacío para fórmula sin elementos válidos', () => {
        expect(parsearFormula('123')).toEqual({});
    });

});
