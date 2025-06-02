const raw = document.getElementById('user-data').textContent;
const users = JSON.parse(raw);

console.log(users)

const userSelectBtns = document.querySelectorAll('.btn-link')
const modalContainer = document.querySelector('.modal-container')

let selectedUser

userSelectBtns.forEach(btn => {
    btn.addEventListener('click', async e => {
        const id = btn.dataset.id
        users.forEach(user => {
            if (user._id === id) {
                console.log(user.name)
                selectedUser = user
                createUserModal()
            }
        });
    })
});

const createUserModal = async () => {
    const content = 
    `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">User Details</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row d-flex align-items-center mb-4">
                                <div class="col-2 d-flex justify-content-center">
                                    <img src="/images/user-1.png" class="card-img-top modal-img" alt="Mobile user">
                                </div>
                                <div class="col-3">
                                    <div class="row mb-3">Name: ${selectedUser.name}</div>
                                    <div class="row">Age: ${selectedUser.birthdate}</div>
                                </div>
                                <div class="col-3">
                                    <div class="row mb-3">Nationality: ${selectedUser.nationality}</div>
                                    <div class="row">Residence</div>
                                </div>
                                <div class="col-2">
                                    <div class="row mb-3">user detail here</div>
                                    <div class="row">user detail here</div>
                                </div>
                            </div>
                            <div class="row">
                                This is some placeholder content to show the scrolling behavior for modals. We use repeated line
                                breaks to demonstrate how content can exceed minimum inner height, thereby showing inner
                                scrolling. When content becomes longer than the predefined max-height of modal, content will be
                                cropped and scrollable within the modal.
        
                                This is some placeholder content to show the scrolling behavior for modals. We use repeated line
                                breaks to demonstrate how content can exceed minimum inner height, thereby showing inner
                                scrolling. When content becomes longer than the predefined max-height of modal, content will be
                                cropped and scrollable within the modal.
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    `

    modalContainer.innerHTML = content
    
}