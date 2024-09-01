export function generateTicks(sliderId, numberOfTicks, labels) {
  const ticksContainer = document.querySelector(`#${sliderId}-ticks`);
  console.log(`Generating ticks for ${sliderId}`);
  console.log(`Element for ID #${sliderId}-ticks:`, ticksContainer);

  if (!ticksContainer) return;

  // Clear previous ticks
  ticksContainer.innerHTML = '';

  for (let i = 0; i < numberOfTicks; i++) {
    const tick = document.createElement('div');
    tick.className = 'tick';

    if (labels && labels[i]) {
      const label = document.createElement('div');
      label.className = 'tick-label';
      label.textContent = labels[i];
      tick.appendChild(label);
    }

    ticksContainer.appendChild(tick);
  }
}
