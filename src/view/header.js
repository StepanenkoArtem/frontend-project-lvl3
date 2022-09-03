import i18n from '../initializers/i18n';
import { STATUS } from '../constants';

const header = document.querySelector('header');

const feedbackLabel = header.querySelector('[aria-label="feedback"]');
const input = header.querySelector('[aria-label="url"]');
const submit = header.querySelector('[type="submit"]');

const isFormDisabled = (status) => status === STATUS.PENDING;

export default (path, current) => {
  switch (path) {
    case 'status': {
      input.disabled = isFormDisabled(current);
      submit.disabled = isFormDisabled(current);
      if (current === STATUS.SUCCESS) {
        input.value = '';
        i18n.then((t) => {
          feedbackLabel.textContent = t('success');
        });
        feedbackLabel.classList.remove('text-danger', 'text-info');
        feedbackLabel.classList.add('text-success');
      }
      if (current === STATUS.PENDING) {
        i18n.then((t) => {
          feedbackLabel.textContent = t('downloading');
        });
        feedbackLabel.classList.remove('text-success', 'text-danger');
        feedbackLabel.classList.add('text-info');
      }
      break;
    }
    case 'error': {
      if (!current) {
        return;
      }
      feedbackLabel.classList.remove('text-success');
      feedbackLabel.classList.add('text-danger');
      i18n.then((t) => {
        feedbackLabel.textContent = t(`errors.${current.message}`);
      });
      break;
    }
    default: {
      break;
    }
  }
};
