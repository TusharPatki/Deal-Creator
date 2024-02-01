
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dealForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get values from form inputs
        const variantName = document.getElementById('variantName').value;
        const productURL = document.getElementById('url').value;
        const salePrice = parseFloat(document.getElementById('salePrice').value);
        const bankName = document.getElementById('bank').value;
        const ecommerceStore = document.getElementById('storename').value;
        const yaperCommission = parseFloat(document.getElementById('yaperCommission').value);
        const discountType = document.querySelector('input[name="discountType"]:checked').value;
        const discountAmount = parseFloat(document.getElementById('discountAmount').value);
        const maxDiscount = parseFloat(document.getElementById('maxDiscount').value);

        const discountType2 = document.querySelector('input[name="discountType2"]:checked').value;
        const discountAmount2 = parseFloat(document.getElementById('discountAmount2').value);
        const maxDiscount2 = parseFloat(document.getElementById('maxDiscount2').value);

        let calculatedDiscount = 0;
        let calculatedDiscount2 = 0;

        if (discountType === 'flat') {
            calculatedDiscount = Math.min(discountAmount, maxDiscount);
        } else if (discountType === 'percentage') {
            calculatedDiscount = Math.min((salePrice * discountAmount) / 100, maxDiscount);
        }

        // Calculate sale price after first discount
        const priceAfterFirstDiscount = salePrice - calculatedDiscount;

        if (discountType2 === 'flat') {
            calculatedDiscount2 = Math.min(discountAmount2, maxDiscount2);
        } else if (discountType2 === 'percentage') {
            calculatedDiscount2 = Math.min((priceAfterFirstDiscount * discountAmount2) / 100, maxDiscount2);
        }

        // Calculate booking price with both discounts
        const bookingPrice = priceAfterFirstDiscount - calculatedDiscount2;

        // Calculate Yaper price
        const yaperPrice = bookingPrice + yaperCommission;
        // Advertisement templates with emojis and ad lines
        const adTemplates = [
            {
                emojis: ['🔥', '🌟', '💥'],
                headlines: ['Hurry up! Limited stock available!', 'Great deals just for you!', 'Unbeatable prices on top products!']
            },
            {
                emojis: ['💸', '🎉', '✨'],
                headlines: ['Exclusive discounts for a limited time!', 'Discover amazing offers!', 'Best deals on the internet!']
            },
            // Add more templates as needed
        ];

        // Select a random advertisement template index
        const randomTemplateIndex = Math.floor(Math.random() * adTemplates.length);
        const selectedTemplate = adTemplates[randomTemplateIndex];

        // Select a random emoji and headline from the chosen template
        const randomEmojiIndex = Math.floor(Math.random() * selectedTemplate.emojis.length);
        const randomHeadlineIndex = Math.floor(Math.random() * selectedTemplate.headlines.length);

        const randomEmoji = selectedTemplate.emojis[randomEmojiIndex];
        const randomHeadline = selectedTemplate.headlines[randomHeadlineIndex];

        // Create advertisement
        const advertisement = document.getElementById('advertisement');
        advertisement.innerHTML = `
            <h2>${randomEmoji} Looto deal ${randomEmoji}</h2>
            <p><a href="${productURL}" id="copyLink" target="_blank">${productURL}</a></p>
            <p>Variant name: ${variantName}</p>
            <p>Sale price: ${salePrice}</p>
            <p>Booking price: ${bookingPrice}</p>
            <p>Yaper is offering at ${yaperPrice}</p>
            <p>On ${ecommerceStore} with ${bankName}</p>
            <p>${randomHeadline}</p>
            <!-- You can modify and add other details as per your template -->
        `;

        // Function to copy the link when clicked
        const copyLink = document.getElementById('copyLink');
        copyLink.onclick = function(event) {
            event.preventDefault();
            const textArea = document.createElement('textarea');
            textArea.value = productURL;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('Copy');
            document.body.removeChild(textArea);
            alert('Link copied to clipboard!');
        };
    });
});
