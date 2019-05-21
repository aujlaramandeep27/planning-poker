import poker from './poker.js';

const app = poker();

function main() {
  app.onEstimate(routeTo);

  const backButton = document.querySelector('button.back');
  backButton && backButton.addEventListener('click', () => routeTo(null));

  const estimateButtons = document.querySelectorAll('.estimate button');
  estimateButtons && estimateButtons.forEach(button => {
    button.addEventListener('click', makeEstimate)
  });

  showView();
}

function makeEstimate(e) {
  app.estimate(parseInt(e.target.textContent, 10));
}

function routeTo(estimate) {
  const params = searchParams();
  if (estimate !== null) {
    params.set('size', estimate);
  } else {
    params.delete('size');
  }
  window.location.search = params;
}

function showView() {
  const params = searchParams();
  if (params.get('size')) {
    const sizingView = document.querySelector('.sizing');
    sizingView.classList.remove('hide');
    sizingView.querySelector('.size').textContent = params.get('size');

    document.querySelector('.estimate').classList.add('hide');
  }
}

function searchParams() {
  const url = new URL(window.location.href);
  return new URLSearchParams(url.search);
}

main();