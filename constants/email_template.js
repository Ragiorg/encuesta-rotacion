export const REMINDER_HTML_TEMPLATE = (employee, baseUrl) => `
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>
            body { margin:0; padding:0; background:#f4f6f8; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; color:#222; }
            .wrap { max-width:680px; margin:28px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.06); }
            .header { background:#0b74de; color:#fff; padding:20px 24px; }
            .header h1 { margin:0; font-size:20px; font-weight:600; letter-spacing:0.2px; }
            .body { padding:24px; line-height:1.5; font-size:15px; color:#233; }
            .meta { font-size:13px; color:#6b7280; margin-top:6px; }
            .cta { margin:22px 0; text-align:left; }
            .btn {
                display:inline-block;
                padding:12px 18px;
                background:#0b74de;
                color:#fff;
                text-decoration:none;
                border-radius:6px;
                font-weight:600;
                transition:background-color .18s ease, transform .05s ease;
            }
            .btn:hover { background:#085fb4; transform:translateY(-1px); }
            .small { font-size:13px; color:#6b7280; margin-top:14px; }
            .footer { padding:14px 24px; font-size:12px; color:#94a3b8; background:#fbfdff; text-align:center; }
            @media (max-width:480px) {
                .wrap { margin:12px; }
                .header h1 { font-size:18px; }
            }
        </style>
    </head>
    <body>
        <div class="wrap" role="article" aria-label="Recordatorio encuesta">
            <div class="header">
                <h1>Recordatorio: Encuesta de rotación pendiente</h1>
            </div>

            <div class="body">
                <p>Hola ${employee?.firstName + ' ' + employee?.lastName},</p>

                <p>
                    Te recordamos que tienes pendiente responder la encuesta de rotación relacionada con tu
                    desarrollo interno en la empresa. Agradecemos que la completes lo antes posible: esto nos ayudará a
                    evaluar condiciones que mejoren tu desempeño y crecimiento profesional dentro de la organización.
                </p>

                <div class="cta">
                    <a
                        class="btn"
                        href="${ baseUrl|| 'https://localhost:3000'}/encuesta/${(employee?.id)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Responder encuesta
                    </a>
                </div>

                <p class="small">
                    Si ya completaste la encuesta, gracias — puedes ignorar este mensaje. Si necesitas ayuda o tienes dudas,
                    contacta a tu representante de RR.HH.
                </p>
            </div>

            <div class="footer">
                Empresa • Desarrollo Interno — Por favor no respondas a este correo
            </div>
        </div>
    </body>
</html>`;