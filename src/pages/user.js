import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import todosService from "../services/todos.js";

const init = async () => {
    const { ok: isLogged, data } = await Auth.me()

    if (!isLogged) {
        return location.login()
    } else {
        loading.stop()
    }

    const user = data.user
    const userInfoEl = document.getElementById('user-info')

    const userInfoAgeEl = userInfoEl.querySelector('[data-user-age]')
    userInfoAgeEl.innerText = user.age

    const userInfoNameEl = userInfoEl.querySelector('[data-user-name]')
    userInfoNameEl.innerText = user.name

    const userInfoEmailEl = userInfoEl.querySelector('[data-user-email]')
    userInfoEmailEl.innerText = user.email
    
    const todos = await todosService.getAll()
    const list = document.getElementById('todo-list')
    
    if (list) {
        list.innerHTML = todos.map(todo => `
            <li>
                <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}" class="todo-checkbox">
                <span style="${todo.completed ? 'text-decoration: line-through' : ''}">${todo.description}</span>
                <button data-id="${todo.id}" class="todo-delete">Удалить</button>
            </li>
        `).join('')
        
        document.querySelectorAll('.todo-checkbox').forEach(cb => {
            cb.onchange = async (e) => {
                await todosService.updateStatus(cb.dataset.id, cb.checked)
                location.reload()
            }
        })
        
        document.querySelectorAll('.todo-delete').forEach(btn => {
            btn.onclick = async () => {
                await todosService.delete(btn.dataset.id)
                location.reload()
            }
        })
    }
    
    const submitBtn = document.getElementById('todo-submit')
    const input = document.getElementById('todo-input')
    
    if (submitBtn) {
        submitBtn.onclick = async () => {
            const text = input.value.trim()
            if (text) {
                await todosService.create(text)
                location.reload()
            }
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}
