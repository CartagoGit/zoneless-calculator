import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('Svc => CalculatorService}', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.lastOperator()).toBe('');
    expect(service.subResultText()).toBe('');
  });

  it("should set resultTest to '0' and lastOperator and subResultText to '' when C is pressed", () => {
    service.resultText.set('123');
    service.lastOperator.set('/');
    service.subResultText.set('456');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.lastOperator()).toBe('');
    expect(service.subResultText()).toBe('');
  });

  it('should update resultText with the number pressed', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('1');
    expect(service.lastOperator()).toBe('+');
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('5');
    service.constructNumber('-');
    service.constructNumber('3');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('5');
    service.constructNumber('*');
    service.constructNumber('3');
    service.constructNumber('=');

    expect(service.resultText()).toBe('15');
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  });

  it('should handle decimal numbers correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('2');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3.2');
  });

  it('should handle negative numbers correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-1');

    service.constructNumber('+/-');
    expect(service.resultText()).toBe('1');
  });

  it('should handle backspace correctly', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');
    service.constructNumber('backspace');
    expect(service.resultText()).toBe('12');

    service.constructNumber('backspace');
    expect(service.resultText()).toBe('1');

    service.constructNumber('backspace');
    expect(service.resultText()).toBe('0');

    service.constructNumber('backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max characters correctly', () => {
    service.resultText.set('1234567890');
    service.constructNumber('1');
    expect(service.resultText()).toBe('1234567890');
  });

  it('should handle multiple operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('-');
    service.constructNumber('*');
    service.constructNumber('/');
    expect(service.lastOperator()).toBe('/');
  });

  it('should handle multiple equals correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');
    service.constructNumber('=');
    expect(service.resultText()).toBe('3');
  });
});
