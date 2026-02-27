export function formatMoney(amount, htmlSymbol = '&#8358;') {
  // 1. Decode HTML Decimal Code to actual symbol (e.g., &#8358; to ₦)
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlSymbol;
  const symbol = tempDiv.textContent;

  // 2. Compact Formatting Logic (Billion, Million, Thousand)
  const formatCompact = (val, suffix) => {
    // toFixed(2) handles cases like 1.04M; replace removes trailing .00
    const formatted = val.toFixed(2).replace(/\.00$/, '');
    return `${symbol}${formatted}${suffix}`;
  };

  if (amount >= 1e9) return formatCompact(amount / 1e9, 'B');
  if (amount >= 1e6) return formatCompact(amount / 1e6, 'M');
  if (amount >= 1000000) return formatCompact(amount / 1000, 'K'); // Optional: triggers for 100k+
//   if (amount >= 1e3) return formatCompact(amount / 1e3, 'K');

  // 3. Standard Comma Formatting for smaller numbers
  const options = {
    minimumFractionDigits: amount >= 100000 ? 2 : 0, 
    maximumFractionDigits: 2
  };
  
  return `${symbol}${amount.toLocaleString('en-US', options)}`;
}
