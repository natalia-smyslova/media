import Popup from "../Popup";

test('it should return true for valid value', () => {
    expect(Popup.checkPopupInput('[1.11111, 2.22222]')).toBeTruthy();
    expect(Popup.checkPopupInput('[11.11111, 22.22222]')).toBeTruthy();
    expect(Popup.checkPopupInput('[1.11111,2.22222]')).toBeTruthy();
    expect(Popup.checkPopupInput('1.11111, 2.22222')).toBeTruthy();
    expect(Popup.checkPopupInput('11.11111, -2.22222')).toBeTruthy();
});

test('it should create Error for invalid value', () => {
    let err = new Error('Неверный формат координат');
    expect(() => {
        (Popup.checkPopupInput('[000.11111, 2.22222]'));
      }).toThrow(err);
      expect(() => {
        (Popup.checkPopupInput('[11.11111 2.22222]'));
      }).toThrow(err);
  });