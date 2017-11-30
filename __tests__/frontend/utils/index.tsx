import { upperCaseFirstChar } from 'frontend/src/utils';

describe('[Utils] utils test', () => {
  it('[upperCaseFirstChar] should return string with first character captitalized', () => {
    const str = 'test sTr';
    expect(upperCaseFirstChar(str)).toBe('Test sTr');
  });
});
