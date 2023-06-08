# Dapps (Decentrallized Applications) (ether.js)


## Common Terminology

### Provider
- Provider là một đối tượng cung cấp khả năng kết nối và tương tác với một mạng blockchain cụ thể. Nó là một thành phần quan trọng để gửi và nhận các yêu cầu đến mạng blockchain và nhận kết quả tương ứng.
- Provider trong ethers.js có thể được sử dụng để tạo kết nối với một mạng blockchain cụ thể, chẳng hạn như Ethereum Mainnet, Ropsten Testnet hoặc mạng riêng (private network). Cung cấp các phương thức để gửi các yêu cầu tới mạng, ví dụ như tạo giao dịch, truy vấn thông tin khối, lấy thông tin tài khoản và nhiều hoạt động khác.
- Các Provider trong ethers.js có thể được cấu hình để kết nối với mạng thông qua các phương thức khác nhau như HTTP, WebSocket hoặc IPC (Inter-Process Communication)

> Provider trong ether chỉ đọc dữ liệu từ blockchain

### Signer
- Khả năng tạo và ký các giao dịch trên mạng blockchain. Nó đại diện cho một khóa cá nhân hoặc một cơ chế xác thực khác mà người dùng sử dụng để xác minh và chứng thực các hoạt động trên blockchain.
- Signer có thể được sử dụng để tạo các giao dịch và ký chúng bằng chữ ký điện tử để xác thực người gửi và đảm bảo tính toàn vẹn của giao dịch. Nó cung cấp các phương thức và chức năng liên quan để thực hiện các hoạt động như tạo giao dịch, ký giao dịch và xác minh chữ ký.
### Contract
- (Smart contract) Hợp đồng thông minh là các đoạn mã chương trình có khả năng tự thực thi và thực hiện các điều khoản và điều kiện được xác định trước mà không cần có sự can thiệp từ bên thứ ba.


### State change 
- Nghĩa là các function có tác động đến chain, làm thay đổi storage trên chain. Có 2 kiểu , 1 kiểu func là đọc, 1 kiểu là ghi
- Func ko làm thay đổi storage thì ko mất phí. Func làm thay đổi storage thì mất phí

### Chú ý:
- Muốn kết nối giữa webserver và smart contract thì phải thông qua user interface
- Để connection to Ethereum network thì dùng **Provider**
- Để giữ private key và sign mọi thứ thì dùng **Signer**
- Nếu người dùng submit or gửi tiền lên blockchain thì phải parse ra hệ BigNumber



## DataTypes
- **BigNumber**: là kiểu dữ liệu đặc biệt cho các số nguyên lớn trong tính toán và xử lý giao dịch. Sử dụng đại diện cho giá trị của đơn vị tiền tệ và số lượng token hay tính toán số dư tài khoản, giá trị giao dịch... 



### How to 
1. Connect to block chain
   - Khởi tạo provider.
   - Get signer
2. Query the blockchain
   - Dùng các method để get block, balance,... từ blockchain
3. Send token from Account1 to Account2 cùng mạng
   - Khởi tạo provider
   - Get signer
   - Send Transaction (to: địa chỉ ví đến, value: Giá trị gửi)
4. Send token from Account1 to Account2 cùng mạng qua RPC
   - Cung cấp 1 RPC cùng mạng
   - connect tới ví 
   - Tạo sender từ private key và provider
   - Từ sender sendTransaction 
5. Interacte with Contract 
   - Yêu cầu:
     - Cần có đồng của contract đó để gửi.
   - Khởi tạo provider.  // const provider = new ethers.providers.Web3Provider(window.ethereum)
   - Get Signer // const signer = provider.getSigner()
   - Khởi tạo 1 contract // const USDTContract = new ethers.Contract(ADDRESS_CONTACT, ERC20_ABI, provider)
   - Connect signer đến contract // const daiContractWithSigner = USDTContract.connect(signer)
   - Và gửi tiền // daiContractWithSigner.transfer(ACCOUNT_2, tokenAmountInEther)
6. change account in metamask
   - use Event trong ether.
   - Bắt được address event đó thông qua window.ether
   - Dùng address mới để connect lại tới contract và thực thi function mong muốn.






### Function
- **parseUnits** để parse số tiền (number) => hệ hex
- **formatEther** để format Ether từ hệ hex => number

