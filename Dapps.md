# Dapps (Decentrallized Applications) (ether.js)


## Common Terminology

### Provider
- Provider là một đối tượng cung cấp khả năng kết nối và tương tác với một mạng blockchain cụ thể. Nó là một thành phần quan trọng để gửi và nhận các yêu cầu đến mạng blockchain và nhận kết quả tương ứng.
- Provider trong ethers.js có thể được sử dụng để tạo kết nối với một mạng blockchain cụ thể, chẳng hạn như Ethereum Mainnet, Ropsten Testnet hoặc mạng riêng (private network). Cung cấp các phương thức để gửi các yêu cầu tới mạng, ví dụ như tạo giao dịch, truy vấn thông tin khối, lấy thông tin tài khoản và nhiều hoạt động khác.
- Các Provider trong ethers.js có thể được cấu hình để kết nối với mạng thông qua các phương thức khác nhau như HTTP, WebSocket hoặc IPC (Inter-Process Communication)
### Signer
- Khả năng tạo và ký các giao dịch trên mạng blockchain. Nó đại diện cho một khóa cá nhân hoặc một cơ chế xác thực khác mà người dùng sử dụng để xác minh và chứng thực các hoạt động trên blockchain.
- Signer có thể được sử dụng để tạo các giao dịch và ký chúng bằng chữ ký điện tử để xác thực người gửi và đảm bảo tính toàn vẹn của giao dịch. Nó cung cấp các phương thức và chức năng liên quan để thực hiện các hoạt động như tạo giao dịch, ký giao dịch và xác minh chữ ký.
### Contract
