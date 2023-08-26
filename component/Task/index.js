import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import Tasks from '../Tasks'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Task extends Component {
  state = {
    myTaskList: [],
    inputTask: '',
    selectTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  onClickAddButton = () => {
    const {inputTask, selectTag} = this.state
    const taskName = inputTask
    const taskCategory = selectTag
    const id = uuid()
    const bgColor = false

    if (taskName.length !== 0) {
      this.setState(prevState => ({
        myTaskList: [
          ...prevState.myTaskList,
          {id, taskName, taskCategory, bgColor},
        ],
        inputTask: '',
        selectTag: tagsList[0].optionId,
      }))
    }
  }

  onChangeInputTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onChangeSelectTag = event => {
    this.setState({selectTag: event.target.value})
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {activeTag, selectTag, myTaskList, inputTask} = this.state
    const filterTaskList =
      activeTag === 'INITIAL'
        ? myTaskList
        : myTaskList.filter(each => each.taskCategory === activeTag)

    return (
      <div className="container">
        <div className="input-container">
          <h1 className="heading">Create a task!</h1>
          <form className="forms">
            <div className="input">
              <label htmlFor="task" className="tasks">
                Task
              </label>
              <input
                type="text"
                id="task"
                className="task-input"
                placeholder="Enter the task here"
                value={inputTask}
                onChange={this.onChangeInputTask}
              />
            </div>
            <div className="input">
              <label htmlFor="tags" className="tags">
                Tags
              </label>
              <select
                id="tags"
                className="tags-input"
                value={selectTag}
                onChange={this.onChangeSelectTag}
              >
                {tagsList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="btn"
              onClick={this.onClickAddButton}
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="tags-container">
          <h1>Tags</h1>
          <ul className="unordered">
            {tagsList.map(each => {
              const isActive = activeTag === each.optionId
              const activeClass = isActive ? 'btn' : 'activeBtn'
              return (
                <li key={each.optionId}>
                  <button
                    type="button"
                    className={activeClass}
                    onClick={() => this.setState({activeTag: each.optionId})}
                  >
                    {each.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1>Tasks</h1>
          <ul>
            {filterTaskList.length === 0 ? (
              <p>No Tasks Added Yet</p>
            ) : (
              filterTaskList.map(eachTask => (
                <Tasks key={eachTask.id} taskDetails={eachTask} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Task
