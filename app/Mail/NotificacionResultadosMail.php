<?php

namespace App\Mail;

use App\Models\Liga;
use App\Models\User;
use App\Models\FechaPartido;
use App\Models\Partido;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NotificacionResultadosMail extends Mailable
{
    use Queueable, SerializesModels;

    public $usuario;
    public $liga;
    public $fechasPartidoRegular;
    public $fechasPartidoPlayoffs;
    public $equipos;
    public $partidos;
    public $partidosPlayoffs;

    /**
     * Create a new message instance.
     */
    public function __construct(User $usuario, Liga $liga, $fechasPartidoRegular, $fechasPartidoPlayoffs, $equipos, $partidos, $partidosPlayoffs)
    {
        $this->usuario = $usuario;
        $this->liga = $liga;
        $this->fechasPartidoRegular = $fechasPartidoRegular;
        $this->fechasPartidoPlayoffs = $fechasPartidoPlayoffs;
        $this->equipos = $equipos;
        $this->partidos = $partidos;
        $this->partidosPlayoffs = $partidosPlayoffs;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Resultados de los ultimos partidos',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.notificacionResultados',
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
