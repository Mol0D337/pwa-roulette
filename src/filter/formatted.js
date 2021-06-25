return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'USD', maximumSignificantDigits: 1 }).format(this.money)
