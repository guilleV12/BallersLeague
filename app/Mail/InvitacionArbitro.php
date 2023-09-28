<?php

namespace App\Mail;

use App\Models\Liga;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvitacionArbitro extends Mailable
{
    use Queueable, SerializesModels;

    public $arbitro;
    public $liga;
    /**
     * Create a new message instance.
     */
    public function __construct(User $user, Liga $liga)
    {
        $this->arbitro = $user;
        $this->liga = $liga;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Invitacion Arbitro',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.invitacionarbitro',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
