# File-manager

## Running


1. Clone repository

```bash
git clone https://github.com/RVitaly1978/file-manager.git
```

2. Checkout to `dev` branch

```bash
git checkout dev
```

3. Run program

```bash
npm run start
npm run start:named
npm run start -- --username
npm run start -- --username=your_username
npm run start -- --username your_username
```

---

## Usage (main notes)


1. `> ` - program command line with prompt (`> `) to type **command** and **arguments**. If you enter an empty command line, a new line will appear with prompt. There is no error message in such case.

2. Program **exit** commands: `Ctrl+C` and **`.exit`** (aliases: **`.e`**, **`.q`**). These **exit** commands allow any content on the line after a space
```bash
> .exit any_content
> .q
```

3. Paths (filenames, dirnames) with spaces should be wrapped with single or double quotes:
```bash
"./my folder/myFile.txt"
'/myFolder/my file.txt'
```

4. An attempt to move upper the `root` directory (by `up` or `cd ..` commands) will fail without an error message

---

## Commands (main notes)


1. **`up`**. Go upper from current working directory
```bash
> up
```

---

2. **`cd`**. Change current working directory
```bash
> cd path_to_directory
```

- **path_to_directory** - can be absolute or relative
```bash
> cd ../someFolder
> cd d:/someFolder
> cd ..
```

---

3. **`add`** Add new empty file in current working directory
```bash
> add new_filename
```

- **new_filename** - should be filename without path

```bash
> add file.txt          // valid
> add ../file.txt       // invalid
```

---

4. **`rn`** (aliases: **`rename`**). Rename file in source directory
```bash
> rn path_to_file new_filename
```

- **path_to_file** - can be with/without file extension
- **new_filename** - should be filename without path

```bash
> rn ./someFolder/file.txt newFile.txt        // result: ./someFolder/newFile.txt
```

---

5. **`mv`** (aliases: **`move`**). Move (move and rename) file - initial file is deleted
6. **`cp`** (aliases: **`copy`**). Copy file - initial file is not deleted
```bash
> mv path_to_file path_to_new_directory
> cp path_to_file path_to_new_directory
```

- **path_to_file** - can be with/without file extension
- **path_to_new_directory** - can be path to directory (moved/copied file will have fileName (from **path_to_file**)) or path to file:

```bash
> mv file.txt ./someFolder                     // result: ./someFolder/file.txt
> cp file.txt ./someFolder/newFile.someExt     // result: ./someFolder/newFile.someExt
```

---

7. **`os`** (aliases: **`system`**, **`sys`**). Prints information in console:
```bash
> os --eol                // --EOL, --e
> os --cpus               // --c
> os --homedir            // --h
> os --username           // --u
> os --architecture       // -a
```

---

8. **`compress`** (aliases: **`zip`**). Compress file (using Brotli algorithm)
```bash
> compress path_to_file path_to_destination
```

- **path_to_file** - can be with/without extension
- **path_to_destination** - can be path to directory (compressed file will have fileName (from **path_to_file**) with extension `.br`) or path to file (compressed file will have this name without additional `.br`):

```bash
> compress file.txt ./someFolder                      // result: ./someFolder/file.txt.br
> compress file.txt ./someFolder/newFile.someExt      // result: ./someFolder/newFile.someExt
```

---

9. **`decompress`** (aliases: **`unzip`**). Decompress file (compressed using Brotli algorithm)
```bash
> decompress path_to_file path_to_destination
```

- **path_to_file** - can be with/without extension
- **path_to_destination** - can be path to directory (decompressed file will have fileName (from **path_to_file**), if there is extension `.br` it will be removed) or path to file (decompressed file will have this name):

```bash
> decompress file.txt.br ./someFolder                     // result: ./someFolder/file.txt
> decompress file.txt.br ./someFolder/newFile.someExt     // result: ./someFolder/newFile.someExt
```
