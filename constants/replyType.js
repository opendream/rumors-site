import i18n from '../i18n';

export const TYPE_ICON = {
  NOT_ARTICLE: '⚠️️',
  OPINIONATED: '💬',
  NOT_RUMOR: '⭕',
  RUMOR_NOT_RUMOR: '◑',
  RUMOR: '❌',
};

export const TYPE_NAME = {
  NOT_ARTICLE: `⚠️️ ${i18n.t('replyType.name.NOT_ARTICLE')}`,
  OPINIONATED: `💬 ${i18n.t('replyType.name.OPINIONATED')}`,
  NOT_RUMOR: `⭕ ${i18n.t('replyType.name.NOT_RUMOR')}`,
  RUMOR_NOT_RUMOR: `◑ ${i18n.t('replyType.name.RUMOR_NOT_RUMOR')}`,
  RUMOR: `❌"ic-more" ${i18n.t('replyType.name.RUMOR')}`,
};

export const TYPE_DESC = {
  NOT_ARTICLE: `${i18n.t('replyType.desc.NOT_ARTICLE')}`,
  OPINIONATED: `${i18n.t('replyType.desc.OPINIONATED')}`,
  NOT_RUMOR: `${i18n.t('replyType.desc.NOT_RUMOR')}`,
  RUMOR_NOT_RUMOR: `${i18n.t('replyType.desc.RUMOR_NOT_RUMOR')}`,
  RUMOR: `${i18n.t('replyType.desc.RUMOR')}`,
};

export const TYPE_INSTRUCTION = {
  NOT_ARTICLE: `${i18n.t('replyType.instruction.NOT_ARTICLE')}`,
  OPINIONATED: `${i18n.t('replyType.instruction.OPINIONATED')}`,
  NOT_RUMOR: `${i18n.t('replyType.instruction.NOT_RUMOR')}`,
  RUMOR_NOT_RUMOR: `${i18n.t('replyType.instruction.RUMOR_NOT_RUMOR')}`,
  RUMOR: `${i18n.t('replyType.instruction.RUMOR')}`,
};

export const TYPE_SUGGESTION_OPTIONS = {
  OPINIONATED: [
    { 
      label: `${i18n.t('replyType.suggestion.opinion1.label')}`, 
      value:`${i18n.t('replyType.suggestion.opinion1.value')}`
    },
    { 
      label: `${i18n.t('replyType.suggestion.opinion2.label')}`, 
      value:`${i18n.t('replyType.suggestion.opinion2.value')}`
    },
    { 
      label: `${i18n.t('replyType.suggestion.opinion3.label')}`, 
      value:`${i18n.t('replyType.suggestion.opinion3.value')}`
    },
    { 
      label: `${i18n.t('replyType.suggestion.opinion4.label')}`, 
      value:`${i18n.t('replyType.suggestion.opinion4.value')}`
    },
  ],
  NOT_ARTICLE: [
    {
      label: `${i18n.t('replyType.suggestion.not_article1.label')}`,
      value: `${i18n.t('replyType.suggestion.not_article1.value')}`,
    },
    { 
      label: `${i18n.t('replyType.suggestion.not_article2.label')}`, 
      value: `${i18n.t('replyType.suggestion.not_article2.value')}` 
    },
    { 
      label: `${i18n.t('replyType.suggestion.not_article3.label')}`, 
      value: `${i18n.t('replyType.suggestion.not_article3.value')}` 
    },
    { 
      label: `${i18n.t('replyType.suggestion.not_article4.label')}`, 
      value: `${i18n.t('replyType.suggestion.not_article4.value')}` 
    },
    { 
      label: `${i18n.t('replyType.suggestion.not_article5.label')}`,
      value: `${i18n.t('replyType.suggestion.not_article5.value')}` 
    },
    { 
      label: `${i18n.t('replyType.suggestion.not_article6.label')}`, 
      value: `${i18n.t('replyType.suggestion.not_article6.value')}` 
    }
  ],
};
