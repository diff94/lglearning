from pathlib import Path
from typing import Optional

#pkg_path = Path("__file__").resolve().parent /"assignments"/"twNLP-app"/ "src"
cwn_model_path = Path.home().resolve() / ".cwn_graph"


def download_cwn_models(upgrade: Optional[bool] = False):
    import CwnSenseTagger, DistilTag
    from CwnGraph import CwnImage

    DistilTag.download(upgrade=upgrade)
    CwnSenseTagger.download(upgrade=upgrade)
    CwnImage.latest()
