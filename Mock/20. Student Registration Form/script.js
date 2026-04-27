const form = document.getElementById('regForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const selectedGender = document.querySelector('input[name="gender"]:checked');
  const course = document.getElementById('course').value;

  const gender = selectedGender ? selectedGender.value : '';

  msg.textContent = 'Registration successful! ' + name + ' (' + gender + ') selected ' + course + '.';
  form.reset();
});
