from anypytools.pytest_plugin import AnyTestFile
import re


# import debugpy
# debugpy.listen(5679)
# print("Waiting for debugger attach")
# debugpy.wait_for_client()

MAIN_REGEX = re.compile(r"Main\s*=\s*{")

def pytest_collect_file(file_path, parent):
    """ Add hook to collect Snippets files for testing"""
    if file_path.suffix == ".any":
        if "Snippet" in file_path.parts[-3]:
            return AnyTestFile.from_parent(parent, path=file_path)
        if "Downloads" in file_path.parts[-2]:
            content = file_path.read_text()
            if MAIN_REGEX.search(content):
                return AnyTestFile.from_parent(parent, path=file_path)