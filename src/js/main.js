// Filter cards by type
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.type === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    // close all
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));

    if (!isOpen) {
      answer.classList.add('open');
      btn.classList.add('open');
    }
  });
});
