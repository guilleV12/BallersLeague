<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {            info('Comando de envío de correo ejecutado');

        $schedule->command('enviar-correo:diario')
            ->dailyAt('12:47:00')
            ->timezone('America/Argentina/Buenos_Aires')
            ->appendOutputTo(storage_path('logs/enviar-correo.log'));
    }

    protected $commands = [
        \App\Console\Commands\EnviarCorreoDiario::class,
    ];
    
    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
