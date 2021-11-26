export const brigadeTypes = [
  {
    key: 1,
    value: 'Реанимационная'
  },
  {
    key: 2,
    value: 'Фельдшерская'
  },
  {
    key: 3,
    value: 'Детская'
  }
]

export const diagnoses = [
  {
    key: 1,
    value: 'COVID'
  },
  {
    key: 2,
    value: 'Инфаркт'
  },
  {
    key: 3,
    value: 'Инсульт'
  },
  {
    key: 4,
    value: 'Хороший был человек'
  }
]

export const ER_CALL_STATUSES = {
  onApproval: 1,
  onRoute: 2,
  onRouteDelay: 3,
  arrived: 4,
  endedLeftInPlace: 5,
  endedRefusedHospital: 6,
  hospitalizationRequest: 7,
  bookingRejected: 8,
  bookingApproved: 9,
  onRouteToHospital: 10,
  stationing: 11,
  ended: 12,
  erReplacementRequired: 13,
  endedTransferred: 14,
  closed: 15,
  canceledByBrigade: 16,
  canceledByDispatcher: 17
}

export const STATUS_LIST = [
  {
    key: ER_CALL_STATUSES.onRoute,
    value: 'В пути',
  },
  {
    key: ER_CALL_STATUSES.arrived,
    value: 'Прибыл',
  },
  {
    key: ER_CALL_STATUSES.endedLeftInPlace,
    value: 'Вызов завершен: На месте',
  },
  {
    key: ER_CALL_STATUSES.endedRefusedHospital,
    value: 'Вызов завершен: Oтказ',
  },
  {
    key: ER_CALL_STATUSES.hospitalizationRequest,
    value: 'Запрос госпитализации',
  },
  {
    key: ER_CALL_STATUSES.onRouteToHospital,
    value: 'На пути в больницу',
  },
  {
    key: ER_CALL_STATUSES.stationing,
    value: 'Стационирование',
  },
  {
    key: ER_CALL_STATUSES.ended,
    value: 'Вызов завершен: Госпитализация',
  }
]

export const USER_ROLES = [
  {
    key: 2,
    value: 'Администратор'
  }, {
    key: 3,
    value: 'Диспетчер'
  }
]

export const TIME_LIMIT = {
  pending: 120000,
  inProcess: 600000,
  onWay: 900000
}

export const APPLICATIONS_FILTER = [
  {
    text: 'Новые',
    value: 1
  },
  {
    text: 'С предложениями',
    value: 2
  },
  {
    text: 'Ожидает подтверждения',
    value: 3
  },
  {
    text: 'Проблематичные',
    value: true
  }
]

export const INSURANCE_ER_FILTER = [
  {
    text: 'Подтверждено',
    value: 1
  },
  {
    text: 'В пути',
    value: 2
  },
  {
    text: 'Прибыл',
    value: 4
  },
  {
    text: 'Требуется замена СМП',
    value: 13
  },
  {
    text: 'Замена в пути',
    value: 14
  },
  {
    text: 'Проблематичные',
    value: true
  }
]

export const ER_BIDDING_FILTER = [
  {
    text: 'Новые',
    value: 1
  },
  {
    text: 'Проблематичные',
    value: true
  }
]

export const HOSPITALIZATION_FILTER = [
  {
    text: 'Запрос госпитализации',
    value: 7
  },
  {
    text: 'Бронирование отклонено',
    value: 8
  },
  {
    text: 'Бронирование подтверждено',
    value: 9
  },
  {
    text: 'На пути в больницу',
    value: 10
  },
  {
    text: 'Стацианирование',
    value: 11
  },
  {
    text: 'Требуется замена СМП',
    value: 13
  },
  {
    text: 'Проблематичные',
    value: true
  }
]

export const EMERGENCY_APP_FILTER = [
  {
    text: 'Отправленные предложения',
    value: 2
  },
  {
    text: 'Ожидает подверждения',
    value: 2
  },
  {
    text: 'Проблематичные',
    value: true
  }
]

export const EMERGENCY_ER_FILTER = [
  {
    text: 'Подтверждено',
    value: 1
  },
  {
    text: 'В пути',
    value: 2
  },
  {
    text: 'В пути(Задержка)',
    value: 3
  },
  {
    text: 'Прибыл',
    value: 4
  },
  {
    text: 'Запрос госпитализации',
    value: 7
  },
  {
    text: 'Бронирование подтверждено',
    value: 9
  },
  {
    text: 'На пути в больницу',
    value: 10
  },
  {
    text: 'Стацианирование',
    value: 11
  },
  {
    text: 'Требуется замена СМП',
    value: 13
  },
  {
    text: 'Проблематичные',
    value: true
  }
]

export const NOTIFICATIONS_FILTER = [
  {
    text: 'Все',
    type: 'all'
  },
  {
    text: 'Непрочитанные',
    type: 'unread'
  },
  {
    text: 'Прочитанные',
    type: 'read'
  }
]

export const GENDER = [{key: 1, type: 'М'}, {key: 2, type: 'Ж'}]

export const DISPATCHERS_TABLE_HEAD = ['ФИО', 'Дата', 'Телефон', 'Почта', '']

export const ACTIVE_TICKETS_HEAD = ['Номер', 'Повод обращения', 'Возраст', 'Дата', 'Создатель', 'Статус']

export const INSURANCE_PENDING_TICKETS_HEAD = ['Номер', 'Повод обращения', 'Возраст', 'Дата', 'Создатель', 'Статус']

export const ER_PENDING_TICKETS_HEAD = ['Номер', 'Повод обращения', 'Возраст', 'Дата', 'Создатель', 'Статус']

export const HISTORY_HEAD = ['Номер', 'Повод обращения', 'Возраст', 'Дата', 'Создатель', 'Статус']

export const ACTIVE_TICKETS_STATUS_NAMES = [
  'Подтверждено',
  'В пути',
  'В пути (задержка)',
  'Прибыл',
  'Вызов завершен: Оставлен на месте',
  'Вызов завершен: Отказ от госпитализация',
  'Запрос госпитализации',
  'Бронирование отклонено',
  'Бронирование подтверждено',
  'На пути в больницу',
  'Стационирование',
  'Вызов завершен',
  'Требуется замена СМП',
  'Вызов завершен: Передана другой СМП',
  'Вызов отменен'
]
