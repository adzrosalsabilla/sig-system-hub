# Pengujian Payment

Untuk pengujian payment gateway bisa menggunakan link https://simulator.sandbox.midtrans.com , berdasarkan payment method yang dipilih ketika pembayaran.

setelah selesai payment, ganti example domain menjadi:
http://localhost:8000/customer/transactions/callback

Contoh:
sebelumnya: https://example.com/?order_id=TRX-e1729171415-8u5y5&status_code=200&transaction_status=settlement
menjadi: http://localhost:8000/customer/transactions/callback?order_id=TRX-e1729171415-8u5y5&status_code=200&transaction_status=settlement