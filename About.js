function animateCounter(counterElement, targetNumber) {
    let currentCount = 0;
    const increment = targetNumber / 200; 

    function updateCount() {
        currentCount += increment;
                if (currentCount >= targetNumber) {
            counterElement.innerText = targetNumber.toLocaleString();
            return; 
        }
                counterElement.innerText = Math.ceil(currentCount).toLocaleString();
                setTimeout(updateCount, 1);
    }
        updateCount();
}
function startAllCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
                if (!isNaN(target)) {
            animateCounter(counter, target);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    startAllCounters();
        console.log("Counters have started animating on page load.");
});