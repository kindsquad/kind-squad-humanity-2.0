// Notification Service for Kind Squad
// Handles email notifications and push notifications for request approvals/rejections

class NotificationService {
  constructor() {
    this.apiEndpoint = '/api/notifications'; // This would be your backend API endpoint
  }

  // Send notification to admin when new request is submitted
  async sendAdminNewRequestNotification(request) {
    try {
      // Send push notification to admin
      await this.sendPushNotification({
        title: '🚨 New Request Submitted',
        message: `${request.firstName} ${request.lastName} submitted a new request for $${request.amountNeeded.toLocaleString()}`,
        type: 'admin',
        requestId: request.id,
        isAdminNotification: true
      });

      // Send email notification to admin
      await this.sendEmailNotification({
        to: 'admin@kindsquad.org', // Admin email
        subject: 'Kind Squad - New Request Submitted',
        template: 'admin_new_request',
        data: {
          firstName: request.firstName,
          lastName: request.lastName,
          email: request.email,
          phone: request.phone,
          requestType: request.assistanceType,
          amount: request.amountNeeded,
          description: request.description,
          requestFor: request.requestFor,
          submissionDate: new Date().toLocaleString(),
          requestId: request.id
        }
      });

      return { success: true, message: 'Admin notifications sent successfully' };
    } catch (error) {
      console.error('Error sending admin notification:', error);
      return { success: false, error: error.message };
    }
  }

  // Send approval notification
  async sendApprovalNotification(request) {
    try {
      // Send push notification through website
      await this.sendPushNotification({
        title: '🎉 Request Approved!',
        message: `Great news! Your ${this.getAssistanceTypeLabel(request.requestType)} request for $${request.amountNeeded.toLocaleString()} has been approved.`,
        type: 'success',
        requestId: request.id
      });

      // Send email notification
      await this.sendEmailNotification({
        to: request.email,
        subject: 'Kind Squad - Request Approved!',
        template: 'approval',
        data: {
          firstName: request.firstName,
          lastName: request.lastName,
          requestType: this.getAssistanceTypeLabel(request.requestType),
          amount: request.amountNeeded,
          requestId: request.id
        }
      });

      return { success: true, message: 'Approval notifications sent successfully' };
    } catch (error) {
      console.error('Error sending approval notification:', error);
      return { success: false, error: error.message };
    }
  }

  // Send rejection notification
  async sendRejectionNotification(request) {
    try {
      // Send push notification through website
      await this.sendPushNotification({
        title: 'Request Update',
        message: `Thank you for your request. Please check your email for important information regarding your ${this.getAssistanceTypeLabel(request.requestType)} request.`,
        type: 'info',
        requestId: request.id
      });

      // Send email notification with rejection letter
      await this.sendEmailNotification({
        to: request.email,
        subject: 'Kind Squad - Request Update',
        template: 'rejection',
        data: {
          firstName: request.firstName,
          lastName: request.lastName,
          requestType: this.getAssistanceTypeLabel(request.requestType),
          requestId: request.id
        }
      });

      return { success: true, message: 'Rejection notifications sent successfully' };
    } catch (error) {
      console.error('Error sending rejection notification:', error);
      return { success: false, error: error.message };
    }
  }

  // Send push notification through website
  async sendPushNotification(notification) {
    // For now, we'll use browser notifications API
    // In production, this would integrate with your push notification service
    
    if ('Notification' in window) {
      // Request permission if not already granted
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }

      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.png',
          badge: '/favicon.png',
          tag: `request-${notification.requestId}`,
          requireInteraction: true
        });
      }
    }

    // Also show in-app notification
    this.showInAppNotification(notification);
  }

  // Show in-app notification
  showInAppNotification(notification) {
    // Create notification element
    const notificationEl = document.createElement('div');
    notificationEl.className = `fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
      notification.type === 'success' ? 'bg-green-600 text-white' : 
      notification.type === 'error' ? 'bg-red-600 text-white' : 
      'bg-blue-600 text-white'
    }`;
    
    notificationEl.innerHTML = `
      <div class="flex items-start">
        <div class="flex-1">
          <h4 class="font-semibold text-sm">${notification.title}</h4>
          <p class="text-sm mt-1 opacity-90">${notification.message}</p>
        </div>
        <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(notificationEl);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notificationEl.parentElement) {
        notificationEl.remove();
      }
    }, 5000);
  }

  // Send email notification
  async sendEmailNotification(emailData) {
    // In production, this would call your backend API
    // For now, we'll simulate the API call and log the email content
    
    const emailContent = this.generateEmailContent(emailData);
    
    console.log('📧 Email Notification:', {
      to: emailData.to,
      subject: emailData.subject,
      content: emailContent
    });

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, messageId: `msg_${Date.now()}` });
      }, 1000);
    });
  }

  // Generate email content based on template
  generateEmailContent(emailData) {
    if (emailData.template === 'admin_new_request') {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #EAB308; margin: 0;">KIND SQUAD®</h1>
            <p style="color: #666; margin: 5px 0;">ADMIN NOTIFICATION</p>
          </div>
          
          <h2 style="color: #DC2626;">🚨 New Request Submitted</h2>
          
          <p>A new assistance request has been submitted and requires admin review.</p>
          
          <div style="background-color: #FEF2F2; border-left: 4px solid #DC2626; padding: 15px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #DC2626;">Request Details</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${emailData.data.firstName} ${emailData.data.lastName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${emailData.data.email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${emailData.data.phone}</p>
            <p style="margin: 5px 0;"><strong>Request For:</strong> ${emailData.data.requestFor}</p>
            <p style="margin: 5px 0;"><strong>Amount:</strong> $${emailData.data.amount.toLocaleString()}</p>
            <p style="margin: 5px 0;"><strong>Type:</strong> ${emailData.data.requestType}</p>
            <p style="margin: 5px 0;"><strong>Submitted:</strong> ${emailData.data.submissionDate}</p>
            <p style="margin: 5px 0;"><strong>Request ID:</strong> ${emailData.data.requestId}</p>
          </div>
          
          <div style="background-color: #F9FAFB; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h4 style="margin: 0 0 10px 0;">Description:</h4>
            <p style="margin: 0; font-style: italic;">${emailData.data.description}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://kind-squad-humanity-2-0.vercel.app/#/admin-dashboard" 
               style="background-color: #EAB308; color: black; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Review Request in Admin Dashboard
            </a>
          </div>
          
          <p style="font-size: 12px; color: #666; text-align: center;">
            This is an automated notification from Kind Squad Admin System.
          </p>
        </div>
      `;
    } else if (emailData.template === 'approval') {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #EAB308; margin: 0;">KIND SQUAD®</h1>
            <p style="color: #666; margin: 5px 0;">HUMANITY 2.0</p>
          </div>
          
          <h2 style="color: #22C55E;">🎉 Great News - Your Request Has Been Approved!</h2>
          
          <p>Dear ${emailData.data.firstName},</p>
          
          <p>We're excited to let you know that your request for <strong>${emailData.data.requestType}</strong> in the amount of <strong>$${emailData.data.amount.toLocaleString()}</strong> has been approved by our board of directors!</p>
          
          <div style="background-color: #F0FDF4; border-left: 4px solid #22C55E; padding: 15px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Request ID:</strong> ${emailData.data.requestId}</p>
            <p style="margin: 5px 0 0 0;"><strong>Amount Approved:</strong> $${emailData.data.amount.toLocaleString()}</p>
          </div>
          
          <p>Our team will be in touch within the next 24-48 hours to coordinate the assistance. Please keep this email for your records.</p>
          
          <p>Thank you for being part of the Kind Squad community. Together, we're building humanity through kindness.</p>
          
          <p>With gratitude,<br>
          <strong>Board of Directors</strong><br>
          Kind Squad</p>
          
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            This is an automated message from Kind Squad. Please do not reply to this email.
          </p>
        </div>
      `;
    } else if (emailData.template === 'rejection') {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #EAB308; margin: 0;">KIND SQUAD®</h1>
            <p style="color: #666; margin: 5px 0;">HUMANITY 2.0</p>
          </div>
          
          <h2 style="color: #374151;">Request Update</h2>
          
          <p>Dear ${emailData.data.firstName},</p>
          
          <p>Thank you so much for reaching out to Kind Squad and sharing your request with us. At this time, we are unable to approve your request for <strong>${emailData.data.requestType}</strong>. We know this isn't the news you were hoping for, but please know it was given thoughtful consideration.</p>
          
          <p>We encourage you to refer to our directory of nonprofits, as there may be other organizations better suited to assist you at this time.</p>
          
          <div style="background-color: #F9FAFB; border-left: 4px solid #6B7280; padding: 15px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Request ID:</strong> ${emailData.data.requestId}</p>
            <p style="margin: 5px 0 0 0;"><strong>Request Type:</strong> ${emailData.data.requestType}</p>
          </div>
          
          <p>Wishing you all the best in your mission.</p>
          
          <p>Sincerely,<br>
          <strong>Board of Directors</strong><br>
          Kind Squad</p>
          
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            This is an automated message from Kind Squad. Please do not reply to this email.
          </p>
        </div>
      `;
    }
  }

  // Helper function to get assistance type label
  getAssistanceTypeLabel(type) {
    const types = {
      'rent': 'Rent Assistance',
      'utilities': 'Utility Bills',
      'food': 'Food Assistance',
      'medical': 'Medical Expenses',
      'domestic_violence': 'Domestic Violence Support',
      'shelter': 'Shelter Assistance',
      'transportation': 'Transportation',
      'childcare': 'Childcare',
      'education': 'Education Support',
      'other': 'Other Assistance'
    };
    return types[type] || type;
  }
}

// Export singleton instance
export default new NotificationService();

