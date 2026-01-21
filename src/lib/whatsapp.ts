import { CartItem } from './store';

// WhatsApp business number - Replace with your actual number
const WHATSAPP_NUMBER = '1234567890'; // Format: country code + number, no + or spaces

export interface OrderDetails {
    items: CartItem[];
    customerName?: string;
    shippingAddress?: string;
}

/**
 * Formats cart items into a readable message string
 */
export function formatOrderMessage(details: OrderDetails): string {
    const { items, customerName, shippingAddress } = details;

    // Create item list
    const itemsList = items
        .map((item, index) => {
            const subtotal = (item.product.price * item.quantity).toFixed(2);
            return `${index + 1}. ${item.product.name} x${item.quantity} - $${subtotal}`;
        })
        .join('\n');

    // Calculate total
    const total = items
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        .toFixed(2);

    // Build message
    let message = `🛒 *New Order from Shoaib*\n\n`;
    message += `*Order Details:*\n${itemsList}\n\n`;
    message += `*Total: $${total}*\n\n`;

    if (customerName) {
        message += `*Customer:* ${customerName}\n`;
    }

    if (shippingAddress) {
        message += `*Shipping Address:* ${shippingAddress}\n`;
    }

    message += `\n---\nPlease confirm this order and provide payment details.`;

    return message;
}

/**
 * Generates WhatsApp URL with encoded message
 */
export function generateWhatsAppUrl(message: string): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp with pre-filled order message
 */
export function initiateWhatsAppCheckout(details: OrderDetails): void {
    const message = formatOrderMessage(details);
    const url = generateWhatsAppUrl(message);

    // Open in new tab (works on both desktop and mobile)
    window.open(url, '_blank');
}

/**
 * Simple message generator for quick orders
 */
export function generateQuickOrderMessage(
    items: CartItem[],
    total: number
): string {
    const itemNames = items
        .map((item) => `${item.product.name} (x${item.quantity})`)
        .join(', ');

    return `Hello Shoaib, I would like to order: ${itemNames}. Total: $${total.toFixed(2)}. My shipping details are: [Please provide your shipping address]`;
}

/**
 * Opens WhatsApp with quick order message
 */
export function initiateQuickCheckout(items: CartItem[], total: number): void {
    const message = generateQuickOrderMessage(items, total);
    const url = generateWhatsAppUrl(message);
    window.open(url, '_blank');
}
