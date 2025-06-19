const buttons = document.querySelectorAll('#tag-buttons button');
const employees = document.querySelectorAll('.employee');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const tag = button.dataset.tag;
    employees.forEach(emp => {
      const tags = emp.dataset.tags.split(',');
      if (tag === 'all' || tags.includes(tag)) {
        emp.style.display = 'block';
      } else {
        emp.style.display = 'none';
      }
    });
  });
});