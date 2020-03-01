const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return loadNotes();
}

const addNote = function (title, body) {

    const notes = loadNotes()
    const duplicateNodes = notes.filter(function (note) {
        return note.title === title
    })
    if (duplicateNodes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.bold.inverse.green('New note added!'))
    } else {
        console.log(chalk.bold.inverse.red('Note title taken!'))
    }
}

const removeNote = function (title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => { return note.title != title })
    if (notes.length === notesToKeep.length) {
        console.log(chalk.bold.inverse.red(`Note "${title}" was not found`))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.bold.inverse.green(`Note "${title}" was removed`))
    }
}

const saveNotes = function (notes) {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = function () {
    try {
        const databuffer = fs.readFileSync('notes.json')
        const dataJson = databuffer.toString()
        return JSON.parse(dataJson)
    } catch (error) {
        return []
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
}