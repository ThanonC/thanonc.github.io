const webhookURL = "https://discord.com/api/webhooks/1369371307132850216/CidrJLbFXM33Uzj3kTJmdvuH3i76HvW-VCPp4t8yG9nPQc2Q107uT870RetV-omOwBDY";

async function sendWebhookMessage(message) {
  try {
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: message
      })
    });

    if (response.ok) {
        console.log("Webhook message sent successfully!");
      } else {
        console.error("Failed to send webhook message:", response.status, response.statusText);
      }

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function validateForm() {
    const x = document.getElementsByName("x-158.2n")[0];
    const x1 = document.getElementsByName("x-157.3t")[0];    
    const x2 = document.getElementsByName("col")[0];
    const x3 = document.getElementsByName("dis")[0];
    const x4 = document.getElementsByName("u")[0];
    //const x5 = document.getElementsByName("x-157.3t")[0];

    if (x && x.value && x1 && x1.value) {
        sendWebhookMessage("User name: " + x.value
            + "\nWhy do you want to buy a thanon?" 
            + x1.value + "\n" + x2.value + "\n" + x3.value + "\n" + x4.value)
    } else {
        console.error("Input not found or empty.");
    }
}