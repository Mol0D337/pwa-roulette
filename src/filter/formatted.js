export default function formatted(value) {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'USD', maximumSignificantDigits: 1 }).format(value)
}

