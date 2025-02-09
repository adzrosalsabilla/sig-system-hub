<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ShareUserData
{
    public function handle($request, Closure $next)
    {
        $user = User::find(Auth::user()->id);

        Inertia::share([
            'auth' => [
                'user' => Auth::user(),
                'notifications' => Auth::user()
                    ? $user
                    ->notifications()
                    ->orderByRaw('read_at IS NULL DESC')
                    ->get()
                    : [],
            ],
        ]);

        return $next($request);
    }
}
