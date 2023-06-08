# Blockchain

Metamask: 
- Như là 1 cái key cho phép bạn access vào new world
- Metamark giữ cho dữ liệu, ví của bạn được an toàn.
- Lá chắn bảo vệ khỏi hacker ăn cắp giữ liệu

> Chý ý (Lợi ích khi úng dụng blockchain vào thực tế)
- Cryptography: Các giao dịch chuỗi khối được xác thực và đáng tin cậy do tính toán phức tạp và bằng chứng mật mã giữa các bên liên quan.
- Immutability: bất kì bản ghi nào của blockchain không thể bị thay đổi và xóa.
- Provenance: đề cập đến thực tế và có thể theo dõi mọi giao dịch, bắt nguồn từ đâu trong sổ cái (blockchain ledger)
- Decentralization: mỗi người trong cấu trúc blockchain có thể truy cập cơ sở dữ liệu phân tán (distributed database). 
- Anonymity: Mỗi một blockchain cụ thể được tạo ra bởi 1 địa chỉ (address) không phải danh tính người dùng. Giữ cho người dùng ẩn danh đặc biệt là trong cấu trúc chuỗi khối công khai.
- Transparency: Hệ thông blockchain thể bị hỏng (corrupted). Điều này khó vì nó đòi hỏi cần 1 sức mạnh khổng lồ để ghi đè mạng blockchain.

**Account:**
**- metamark: khanh1996metamark**

 > Ethereum Yellow Paper. => define cụ thể các formal về Ethereum
### Architecture 
- Public blockchain architecture
- Private blockchain architecture
- Consortium blockchain architecture

#### Core blockchain architecture components:
**Node**: Node là người dùng or máy tính trong cấu trúc blockchain. Mỗi người là 1 bản sao độc lập trong sổ cái blockchain (blockchain ledger).

**Transaction**: là thứ thứ nhỏ nhất để xấy nên hệ thống blockchain. (bản ghi, thông tin,...) phục vụ như là mục đích của blockchain.

**Block**: Một cấu trúc dữ liệu được sử dụng để giữ các giao dịch (transactions) được phân phối cho tất cả các node trong mạng.

**Chain**: Một chuỗi các block theo thức tự cụ thể.

**Miners**: Node cụ thể thực hiện quá trình xác minh khối (block verification) trước khi thêm bất cứ thứ gì vào blockchain structure.

**Consensus** (consensus protocol) là một bộ quy tắc và sự sắp xếp để thực hiện các hoạt động chuỗi khối. Giao thức đồng thuận



## Secret Recovery Phrase
- Save in a password manager
- Store in a safe deposit box
- Write down and store in multiple secret places
- Secret Recovery Phrase gồm 12 từ : veteran squeeze advice hole off dolphin hedgehog digital pool curve develop ribbon

## Transactions
- Chữ ký mã từ tài khoản

## Mining - miner
- Người build blocks, encoding them onto Blockchain

## SHA256 Hash
- Hash of different data is always different
- No two different sets of data will have the same hash value
- Có thể change data => into hash value. Còn ngược lại thì không.


## Block
- Có nhiều block trong 1 blockchain
- Các mã của block được mã hóa thẩm định
- Link các block với nhau dựa vào mã hash
- Các block đã commit thì sẽ không thể sửa đổi kd


## Proof of Work (PoW)
PoW là một cơ chế đồng thuận được sử dụng trong Bitcoin và nhiều blockchain khác. Các thợ mỏ (miners) phải giải quyết một bài toán toán học phức tạp để chứng minh rằng họ đã tiêu tốn một lượng lớn công việc. Người giải quyết được bài toán đầu tiên sẽ được ủy quyền thêm vào blockchain và nhận được phần thưởng.
## Proof of Stake (PoS)
PoS là một cơ chế đồng thuận mà các nút đóng vai trò là "người bảo vệ" dựa trên số lượng tiền mà họ đặt cược trong hệ thống. Thay vì giải quyết bài toán toán học, các nút được chọn để tạo khối dựa trên tỷ lệ sở hữu tiền tệ của họ. Cơ chế này được sử dụng trong Ethereum và các blockchain khác.
## Delegated Proof of Stake (DPoS)
Delegated Proof of Stake (DPoS): DPoS là một biến thể của PoS mà các chủ sở hữu tiền tệ bỏ phiếu để chọn một số lượng nhất định các nhà đóng góp (witnesses) để đại diện cho họ trong việc tạo khối và xác nhận giao dịch. Các witnesses được chọn sẽ kiểm soát quyền tạo khối và được trao quyền phát biểu về việc thay đổi trong mạng. DPoS được sử dụng trong nhiều blockchain như Steem và BitShares.
## Practical Byzantine Fault Tolerance (PBFT)
PBFT là một cơ chế đồng thuận được sử dụng trong các hệ thống blockchain doanh nghiệp. Nó yêu cầu một số lượng quá nửa nút trong mạng đồng ý về một trạng thái mới. PBFT đảm bảo tính nhất quán trong mạng, ngay cả khi một số nút bị tấn công hoặc gửi thông tin không chính xác.

## Elimination of middlemen
- Trong blockchain ám chỉ việc loại bỏ sự phụ thuộc vào các bên trung gian trong quá trình thực hiện các giao dịch và trao đổi thông tin. 
- Blockchain cho phép loại bỏ hoặc giảm thiểu sự phụ thuộc vào các bên trung gian bằng cách sử dụng các cơ chế đồng thuận và mã hóa để xác nhận và ghi nhận giao dịch một cách trực tiếp giữa các bên tham gia. Thay vì phải tin tưởng và trao quyền cho một bên trung gian, blockchain sử dụng mạng lưới các nút đồng thuận để kiểm tra và xác minh tính hợp lệ của giao dịch.

1. Loại bỏ trung gian trong blockchain mang lại một số lợi ích, bao gồm:
   - Giảm chi phí: Việc loại bỏ các bên trung gian giúp giảm chi phí giao dịch, vì không cần trả phí cho các dịch vụ trung gian.

+ Tăng tốc độ giao dịch: Việc loại bỏ các bên trung gian giúp giảm thời gian xử lý và xác nhận giao dịch, do không cần chờ đợi sự phê duyệt từ các bên thứ ba.

+ Tăng tính minh bạch: Với việc các giao dịch được ghi lại và xác minh trên blockchain, tính minh bạch và khả năng tra cứu lịch sử giao dịch được cải thiện.

+ Tăng tính bảo mật: Blockchain sử dụng mã hóa và cơ chế đồng thuận để đảm bảo tính bảo mật và chống lại các hình thức gian lận và tấn công.

## Misconceptions (sai lầm)

## Decentralization
- Decentralization (phân quyền, phi tập trung) là cơ sở thông tin lưu trữ thư viện tài nguyên và giao dịch trên mạng ngang hàng. “Tài nguyên” có thể không chỉ là dữ liệu tiền mặt hoặc giao dịch mà còn là dữ liệu bổ sung về quyền sở hữu, thỏa thuận, sản phẩm và một số dữ liệu khác.


## Smart contracts
- Nó thể hiện một cách tự động hóa và tự thực hiện các điều khoản của một hợp đồng truyền thống (hợp động trên giấy), mà không cần phải dựa vào sự tin tưởng vào bên thứ ba hoặc cơ quan trung gian. Với phương thức này thì không ai kiểm soát tiền bạc.
- Tại sao lại tin tưởng smart contracts. Vì những lý do sau:
  - Immutable: Tính bất biến. Khi 1 smart contract tạo ra thì nó không thể bị thay đổi lần nữa.
  - Distributed: Tính phân tán. đầu ra của 1 smart contract được validate bởi tất cả ai trên mạng lưới.
- Smart contract có nhiều ứng dụng tiềm năng trong các lĩnh vực khác nhau như bất động sản, bảo hiểm, chứng khoán và quản lý chuỗi cung ứng.

## EVM (Etherum Virtual Machine)
- EVM là một máy ảo được sử dụng trong hệ thống blockchain Ethereum. Nó là một môi trường chạy các smart contract trên Ethereum. EVM là một phần quan trọng trong cấu trúc của Ethereum, cho phép các smart contract được thực thi và mô phỏng một cách đáng tin cậy trên mạng lưới Ethereum.


# Dapps (Decentrallized Applications)

- A dApp có backend code chạy trên mạng lưới peer-to-peer. 
- A dApp cũng có thể là frontend code và giao diện người dùng được viết ở bất kỳ ngôn ngữ nào gọi dến backend. Hơn thế nữa frontend có thể được lưu trữ trên bộ nhớ phi tập trung. như [IPFS]((https://ipfs.tech/))
- **Decentralized:** dApps nó hoạt động trên Ethereum, mạng lưới phi tập trung công khai ở bất cứ đâu. Không một ai có thể kiểm soát.
- **Deterministic:** (xác nhận) dapps thực hiện cùng một chức năng bất kể môi trường mà chúng được thực thi. 
- **Turing complete:** dApps có thể thực hiện bất cứ hành động nào với nguồn cần thiết.
- **Isolated:** (bị cô lập) dApps thực thi trên một EVM nếu mà smart contract có bug thì nó không không cản trở gì và mạng lưới blockchain vẫn hoạt động bình thường.

## Client Libraries
- Phần mềm chạy trên block chain
## Client Nodes 
- Client Node là các nút trong hệ thống mà người dùng cuối và ứng dụng có thể sử dụng để kết nối và tương tác với blockchain. Client nodes có vai trò quan trọng trong việc tham gia vào mạng blockchain và thực hiện các hoạt động như tạo giao dịch, xem thông tin khối, truy vấn dữ liệu, và tham gia quá trình đồng thuận.
- Có hai loại client nodes phổ biến trong mạng blockchain: **full nodes** (nút đầy đủ) và **light nodes** (nút nhẹ).
  + Full nodes: là các nút trong mạng blockchain lưu trữ toàn bộ lịch sử giao dịch và thông tin khối từ khởi tạo của blockchain đến thời điểm hiện tại. Điều này đòi hỏi lưu trữ một bản sao hoàn chỉnh của blockchain trên máy tính hoặc thiết bị của nút. Full nodes có khả năng kiểm tra tính hợp lệ của mọi giao dịch và khối trong mạng, và họ đóng vai trò quan trọng trong việc bảo vệ tính toàn v ẹn của blockchain. Người dùng và ứng dụng có thể sử dụng full nodes để truy vấn thông tin chi tiết về blockchain và thực hiện các hoạt động liên quan.
  + Light nodes: là các nút trong mạng blockchain không lưu trữ toàn bộ lịch sử giao dịch và thông tin khối. Thay vào đó, chúng chỉ lưu trữ một phần nhỏ của dữ liệu cần thiết để thực hiện các hoạt động cơ bản như xác nhận giao dịch, truy vấn dữ liệu và tham gia đồng thuận. Light nodes tiêu tốn ít tài nguyên và không gian lưu trữ hơn so với full nodes, nhưng đánh đổi bằng việc giới hạn khả năng kiểm tra độc lập của mình. Tuy nhiên, light nodes vẫn có thể kết nối và tương tác với mạng blockchain để thực hiện các hoạt động cần thiết. 

- List RPC cung cấp [Tài liệu tham khảo](https://chainlist.org/chain/11155111)



## Define
- **Native token**: Native token (đồng token gốc) trong blockchain là đơn vị tiền tệ được sử dụng mặc định trên mạng blockchain đó. Nó là đồng tiền gốc của mạng, được sử dụng để định giá các hoạt động và giao dịch trên nền tảng blockchain.




## Functionality
- **transfer(to, amount)** => Để gửi tiền từ ví mình sang 1 ví nào đó trên 1 token trong contract.
- **transferFrom(from, to, amount)**
  - Để gửi tiền từ ví from => to
  - Require phải được sự đồng ý từ hàm **approve(spender, amount)** tk owner cho phép người muốn lấy tiền được lấy bao nhiêu tiền.
  - Từ spender (tk muốn lấy tiền) sẽ rút tiền từ from là (tk đưa tiền) và to là (tk nhận tiền).
- **approve(spender, amount)** tk owner cho phép người muốn lấy tiền được lấy bao nhiêu tiền.
- **burn(amount)** đốt tiền. bản chất là nó sẽ gửi tiền vào địa chỉ 0x0000000 để vứt 1 số tiền nhất định.